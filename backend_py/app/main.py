from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.core.database import init_db
from app.api.routes import auth, contact, resume
import os

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize Beanie and connect to DB
    try:
        print("Attempting to connect to the database...")
        await init_db()
        print("Successfully connected to the database and initialized Beanie.")
    except Exception as e:
        print(f"CRITICAL ERROR DURING STARTUP: {e}")
        import traceback
        traceback.print_exc()
        raise e
    yield
    # Cleanup if needed

app = FastAPI(title="ResumeIQ API", lifespan=lifespan)

# Allow CORS for development and production
origins = [
    "http://localhost:3000",
]

# If in production and served from the same domain, CORS might not be strictly necessary,
# but we configure it to be safe.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all for now to mirror the previous permissive or identical-origin setup, or restrict to origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create static directory structure for local dev if missing
os.makedirs("static/assets", exist_ok=True)

# Include Routers
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(resume.router, prefix="/resume", tags=["Resume"])
app.include_router(contact.router, prefix="/contact", tags=["Contact"])

from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

# Serve static assets
app.mount("/assets", StaticFiles(directory="static/assets"), name="assets")

# Catch-all for SPA React Router
@app.get("/{full_path:path}")
async def serve_spa(full_path: str):
    # Try to serve a specific static file if requested (e.g., vite.svg)
    file_path = os.path.join("static", full_path)
    if os.path.isfile(file_path):
        return FileResponse(file_path)
    
    # Otherwise fallback to index.html for React Router
    index_path = "static/index.html"
    if os.path.isfile(index_path):
        return FileResponse(index_path)
    
    # Fallback if no frontend built
    return {"message": "ResumeIQ API (FastAPI) - Frontend not built yet."}

