from fastapi import APIRouter, HTTPException, status, UploadFile, File, Depends
from pydantic import BaseModel
from typing import Any, List
from beanie import PydanticObjectId
from app.api.deps import get_current_user
from app.models.user import User
from app.models.resume_analysis import ResumeAnalysis
from app.services.pdf import extract_text_from_pdf
from app.services.gemini import analyze_resume_with_gemini

router = APIRouter()

class AnalyzeRequest(BaseModel):
    resumeText: str
    jobDescription: str
    fileName: str = "Untitled Resume"

@router.post("/upload")
async def upload_resume(resume: UploadFile = File(...), current_user: User = Depends(get_current_user)):
    if resume.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF files are allowed.")
    
    file_bytes = await resume.read()
    
    if len(file_bytes) > 10 * 1024 * 1024:
        raise HTTPException(status_code=413, detail="File too large. Maximum size is 10MB.")
        
    try:
        text = extract_text_from_pdf(file_bytes)
    except Exception as e:
        print("PDF parse error:", e)
        raise HTTPException(status_code=500, detail="Failed to parse PDF. Please try a different file.")
        
    if not text or len(text) < 50:
        raise HTTPException(status_code=422, detail="Could not extract meaningful text from the PDF. Please ensure it is not a scanned image.")
        
    return {"text": text}

@router.post("/analyze")
async def analyze_resume(request: AnalyzeRequest, current_user: User = Depends(get_current_user)):
    try:
        analysis = await analyze_resume_with_gemini(request.resumeText, request.jobDescription)
    except ValueError as e:
        raise HTTPException(status_code=502, detail=str(e))
    except Exception as e:
        print("Gemini API error:", e)
        raise HTTPException(status_code=500, detail="AI analysis failed. Please try again later.")
        
    saved_analysis = None
    try:
        doc = ResumeAnalysis(
            user=current_user.id,
            fileName=request.fileName,
            jobDescription=request.jobDescription,
            analysis=analysis
        )
        saved_analysis = await doc.insert()
    except Exception as e:
        print("Failed to save analysis to DB:", e)
        
    return {
        "success": True,
        "suggestions": {
            "analysis": analysis,
            "id": str(saved_analysis.id) if saved_analysis else None
        }
    }

@router.get("/history")
async def get_history(current_user: User = Depends(get_current_user)):
    history = await ResumeAnalysis.find(ResumeAnalysis.user == current_user.id).sort(-ResumeAnalysis.createdAt).to_list()
    # In Node.js we excluded jobDescription. With Beanie we can do `.project(Model)` but returning the full model is fine for now, or we can transform it to dict
    result = []
    for h in history:
        d = h.model_dump()
        d["_id"] = str(d["id"])
        del d["jobDescription"]
        result.append(d)
    return result

@router.get("/history/{id}")
async def get_history_by_id(id: PydanticObjectId, current_user: User = Depends(get_current_user)):
    evaluation = await ResumeAnalysis.find_one(ResumeAnalysis.id == id, ResumeAnalysis.user == current_user.id)
    if not evaluation:
        raise HTTPException(status_code=404, detail="Evaluation not found.")
    d = evaluation.model_dump()
    d["_id"] = str(d["id"])
    return d
