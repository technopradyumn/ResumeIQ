import google.generativeai as genai
import json
from app.core.config import settings

genai.configure(api_key=settings.GEMINI_API_KEY)

async def analyze_resume_with_gemini(resume_text: str, job_description: str) -> dict:
    prompt = f"""
You are an expert ATS (Applicant Tracking System) resume analyzer. Analyze the resume against the job description and return ONLY a valid JSON object — no markdown, no code fences, no extra text.

The JSON must have exactly these keys:

{{
  "compatibility_score": <integer 0-100>,
  "resume_skills": [<list of skills/technologies found in the resume>],
  "job_description_skills": [<list of skills/technologies required by the job description>],
  "missing_skills": {{
    "from_resume_for_job_description": [<skills in job description but NOT in resume>],
    "from_job_description_for_resume": [<skills in resume but NOT in job description>]
  }},
  "ats_optimization_tips": [<3-5 actionable ATS tips as plain strings>],
  "ats_optimized_bullet_point_improvements": [
    {{
      "original_summary": "<original bullet or section from resume>",
      "reasoning": "<why this needs improvement>",
      "suggested_bullets": ["<improved bullet 1>", "<improved bullet 2>"]
    }}
  ],
  "overall_assessment": "<2-3 sentence overall evaluation>"
}}

RESUME:
{resume_text}

JOB DESCRIPTION:
{job_description}

Return only the JSON object. No explanation, no markdown, no code fences.
""".strip()

    model = genai.GenerativeModel("gemini-2.5-flash")
    # Using generate_content async equivalent, or we can just use synchronous since genai SDK uses sync wrappers mostly, but let's try generate_content_async if available
    try:
        response = await model.generate_content_async(prompt)
    except AttributeError:
        # Fallback to sync if async is not available in the installed version
        response = model.generate_content(prompt)
        
    raw_text = response.text
    
    # Strip markdown code fences if Gemini wraps in them
    cleaned = raw_text.strip()
    if cleaned.startswith("```json"):
        cleaned = cleaned[7:]
    elif cleaned.startswith("```"):
        cleaned = cleaned[3:]
        
    if cleaned.endswith("```"):
        cleaned = cleaned[:-3]
        
    cleaned = cleaned.strip()

    try:
        analysis = json.loads(cleaned)
        return analysis
    except json.JSONDecodeError as e:
        print("JSON parse failed. Raw Gemini response:", raw_text)
        raise ValueError("AI returned an unexpected format. Please try again.") from e
