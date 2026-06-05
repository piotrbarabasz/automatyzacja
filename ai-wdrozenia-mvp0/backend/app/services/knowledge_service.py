from pathlib import Path


class KnowledgeService:
  def __init__(self, offer_path: Path) -> None:
    self.offer_path = offer_path

  def load_offer(self) -> str:
    if not self.offer_path.exists():
      raise FileNotFoundError(f'Knowledge base file not found: {self.offer_path}')

    return self.offer_path.read_text(encoding='utf-8')
