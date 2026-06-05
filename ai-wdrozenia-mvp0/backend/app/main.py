from __future__ import annotations

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.config import get_settings
from app.models import ChatRequest, ChatResponse
from app.services.knowledge_service import KnowledgeService
from app.services.llm_service import LLMService


settings = get_settings()
knowledge_service = KnowledgeService(settings.knowledge_base_path)
llm_service = LLMService(settings=settings, knowledge_service=knowledge_service)

app = FastAPI(
  title='AI wdrożenia chatbot backend',
  version='1.0.0',
)

app.add_middleware(
  CORSMiddleware,
  allow_origins=[settings.angular_origin, 'http://127.0.0.1:4200'],
  allow_credentials=True,
  allow_methods=['GET', 'POST', 'OPTIONS'],
  allow_headers=['*'],
)


@app.get('/health')
def health() -> dict[str, str]:
  return {'status': 'ok'}


@app.post('/chat', response_model=ChatResponse)
async def chat(payload: ChatRequest) -> ChatResponse:
  message = payload.message.strip()

  if not message:
    raise HTTPException(status_code=422, detail='Message cannot be empty.')

  try:
    return await llm_service.answer(message=message, conversation_id=payload.conversationId)
  except ValueError as exc:
    raise HTTPException(status_code=422, detail=str(exc)) from exc
  except FileNotFoundError as exc:
    raise HTTPException(status_code=500, detail='Knowledge base is not configured.') from exc
  except Exception as exc:
    raise HTTPException(status_code=502, detail='Chatbot service is temporarily unavailable.') from exc
