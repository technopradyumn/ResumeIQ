from beanie import Document, Link
from pydantic import Field
from typing import Any, Optional
from datetime import datetime, timezone
from app.models.user import User
from beanie import PydanticObjectId

class ResumeAnalysis(Document):
    user: PydanticObjectId
    fileName: str
    jobDescription: Optional[str] = None
    analysis: dict[str, Any]
    createdAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updatedAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    class Settings:
        name = "resumeanalyses"
