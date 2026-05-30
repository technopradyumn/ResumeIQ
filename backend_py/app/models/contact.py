from beanie import Document
from pydantic import EmailStr, Field
from datetime import datetime, timezone

class Contact(Document):
    name: str
    email: EmailStr
    message: str
    createdAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updatedAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    class Settings:
        name = "contacts"
