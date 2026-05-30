from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr
from app.models.contact import Contact

router = APIRouter()

class ContactRequest(BaseModel):
    name: str
    email: EmailStr
    message: str

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_contact(request: ContactRequest):
    if len(request.message.strip()) < 10:
        raise HTTPException(status_code=400, detail="Message must be at least 10 characters.")
    
    contact = Contact(name=request.name, email=request.email, message=request.message)
    await contact.insert()
    
    return {"message": "Message received! We'll get back to you soon."}
