from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from app.core.config import settings
import app.models as models

async def init_db():
    client = AsyncIOMotorClient(settings.MONGO_URI)
    
    # We parse the DB name from the URI or default to "ats_resume"
    db_name = settings.MONGO_URI.split("/")[-1].split("?")[0]
    if not db_name:
        db_name = "ats_resume"

    await init_beanie(
        database=client[db_name],
        document_models=[
            models.User,
            models.Contact,
            models.ResumeAnalysis
        ]
    )
