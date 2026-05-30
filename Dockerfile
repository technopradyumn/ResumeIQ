# ─────────────────────────────────────────────────────────
# Stage 1: Build the React frontend (Bun)
# ─────────────────────────────────────────────────────────
FROM oven/bun:1 AS frontend-builder

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN bun install

COPY frontend/ ./
RUN bun run build

# ─────────────────────────────────────────────────────────
# Stage 2: Run the Python FastAPI backend
# ─────────────────────────────────────────────────────────
FROM python:3.11-slim AS backend

WORKDIR /app

# Install Python dependencies
COPY backend_py/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source
COPY backend_py/ ./

# Copy the built frontend into a static directory the backend can serve
COPY --from=frontend-builder /app/frontend/dist ./static

# Expose the backend port
EXPOSE 5000

# Start FastAPI with uvicorn (Render uses the PORT environment variable)
CMD sh -c "uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-5000}"
