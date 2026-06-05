from __future__ import annotations

from typing import Optional
from uuid import uuid4

from anyio import to_thread
from openai import OpenAI

from app.config import Settings
from app.models import ChatResponse
from app.services.knowledge_service import KnowledgeService


SYSTEM_PROMPT = """
Jesteś asystentem sprzedażowym firmy wdrażającej AI chatboty i automatyzację maili dla małych firm.

Zasady:
- odpowiadaj po polsku;
- odpowiadaj konkretnie i sprzedażowo, ale bez przesady;
- używaj prostego języka;
- nie obiecuj nierealnych wyników;
- odpowiadaj wyłącznie na podstawie przekazanego kontekstu oferty;
- jeśli pytanie jest poza zakresem, grzecznie przekieruj rozmowę na temat wdrożeń AI dla małych firm;
- jeśli pytanie dotyczy ceny, podaj widełki z oferty;
- jeśli pytanie dotyczy wdrożenia, wyjaśnij proces;
- jeśli pytanie dotyczy szczegółów technicznych, odpowiedz krótko i zrozumiale;
- kończ odpowiedź lekką zachętą do kontaktu, jeśli naturalnie pasuje.
""".strip()


class LLMService:
  def __init__(self, settings: Settings, knowledge_service: KnowledgeService) -> None:
    self.settings = settings
    self.knowledge_service = knowledge_service
    self.client = OpenAI(api_key=settings.openai_api_key) if settings.openai_api_key else None

  async def answer(self, message: str, conversation_id: Optional[str] = None) -> ChatResponse:
    clean_message = message.strip()

    if not clean_message:
      raise ValueError('Message cannot be empty.')

    current_conversation_id = conversation_id or str(uuid4())

    if not self.client:
      return ChatResponse(
        answer='To jest wersja demo. Skonfiguruj OPENAI_API_KEY, aby włączyć odpowiedzi AI.',
        conversationId=current_conversation_id,
      )

    offer_context = self.knowledge_service.load_offer()
    answer = await to_thread.run_sync(lambda: self._call_openai(clean_message, offer_context))

    return ChatResponse(answer=answer, conversationId=current_conversation_id)

  def _call_openai(self, message: str, offer_context: str) -> str:
    user_input = f"""
Kontekst oferty:
{offer_context}

Pytanie użytkownika:
{message}
""".strip()

    response = self.client.with_options(timeout=self.settings.llm_timeout_seconds).responses.create(
      model=self.settings.openai_model,
      instructions=SYSTEM_PROMPT,
      input=[
        {
          'role': 'user',
          'content': user_input,
        }
      ],
      max_output_tokens=500,
    )

    output_text = getattr(response, 'output_text', None)

    if output_text:
      return output_text.strip()

    return 'Nie udało się odczytać odpowiedzi modelu. Spróbuj ponownie za moment.'
