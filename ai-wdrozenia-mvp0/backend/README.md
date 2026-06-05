# Backend FastAPI dla MVP 1

Backend obsługuje demo chatbota AI dla landing page Angular.

## Uruchomienie backendu

Wejdź do katalogu backendu:

```powershell
cd backend
```

Utwórz i aktywuj środowisko wirtualne:

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
```

Zainstaluj zależności:

```powershell
pip install -r requirements.txt
```

Utwórz plik `.env` na podstawie `.env.example`:

```powershell
Copy-Item .env.example .env
```

Ustaw `OPENAI_API_KEY` w `.env`, jeśli chcesz włączyć odpowiedzi AI. Bez klucza endpoint `/chat` zwraca fallback demo.

Uruchom FastAPI:

```powershell
uvicorn app.main:app --reload
```

## Uruchomienie Angulara

Z katalogu projektu Angular:

```powershell
npm install
ng serve
```

Frontend używa backendu pod adresem:

```text
http://localhost:8000/chat
```

Adres API jest trzymany w `src/environments/environment.ts`.

## Endpointy

`GET /health`

Zwraca status backendu.

`POST /chat`

Payload:

```json
{
  "message": "Ile kosztuje wdrożenie chatbota?",
  "conversationId": "opcjonalny-identyfikator"
}
```

Response:

```json
{
  "answer": "Odpowiedź chatbota",
  "conversationId": "identyfikator-rozmowy"
}
```

## Zakres MVP 1

Backend ładuje `knowledge_base/offer.md`, wysyła kontekst oferty i pytanie użytkownika do OpenAI Responses API oraz zwraca odpowiedź do Angulara. MVP 1 nie zawiera RAG, uploadu PDF, bazy danych, panelu admina, autoryzacji ani integracji z Google Sheets, Google Calendar lub płatnościami.
