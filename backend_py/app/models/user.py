from beanie import Document
from pydantic import EmailStr, Field
from datetime import datetime, timezone

class User(Document):
    name: str
    email: EmailStr
    password: str
    createdAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updatedAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    class Settings:
        name = "users"
