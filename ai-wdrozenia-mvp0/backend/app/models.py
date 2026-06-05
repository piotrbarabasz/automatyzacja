from __future__ import annotations

from typing import Optional

from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
  message: str = Field(..., min_length=1, max_length=1000)
  conversationId: Optional[str] = Field(default=None, max_length=120)


class ChatResponse(BaseModel):
  answer: str
  conversationId: str
