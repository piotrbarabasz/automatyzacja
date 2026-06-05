from __future__ import annotations

from functools import lru_cache
from pathlib import Path
from typing import Optional

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
  model_config = SettingsConfigDict(env_file='.env', env_file_encoding='utf-8', extra='ignore')

  openai_api_key: Optional[str] = None
  openai_model: str = 'gpt-4o-mini'
  llm_timeout_seconds: float = 20.0
  angular_origin: str = 'http://localhost:4200'

  @property
  def knowledge_base_path(self) -> Path:
    return Path(__file__).resolve().parents[1] / 'knowledge_base' / 'offer.md'


@lru_cache
def get_settings() -> Settings:
  return Settings()
