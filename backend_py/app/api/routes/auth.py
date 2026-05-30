from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr
from app.models.user import User
from app.core.security import get_password_hash, verify_password, create_access_token

router = APIRouter()

class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    token: str

@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(request: RegisterRequest):
    if len(request.password) < 6:
        raise HTTPException(status_code=400, detail="Password must be at least 6 characters.")
    
    existing_user = await User.find_one(User.email == request.email)
    if existing_user:
        raise HTTPException(status_code=409, detail="An account with this email already exists.")
    
    hashed_password = get_password_hash(request.password)
    user = User(name=request.name, email=request.email, password=hashed_password)
    await user.insert()
    
    return {"message": "Registration successful! You can now log in."}

@router.post("/login", response_model=TokenResponse)
async def login(request: LoginRequest):
    user = await User.find_one(User.email == request.email)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password.")
    
    if not verify_password(request.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid email or password.")
    
    token = create_access_token(data={"id": str(user.id), "email": user.email})
    return {"token": token}
