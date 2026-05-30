<div align="center">

# ✦ ResumeATS Analyser

### AI-Powered Resume Optimization Platform

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-ats--resume--9807.onrender.com-00c896?style=for-the-badge)](https://ats-resume-9807.onrender.com/)
[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB_Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)

<br />

> **Beat the bots. Land the interview.**
> Upload your resume, get an ATS score, and receive AI-driven suggestions to make recruiters notice you — in under 2 minutes.

<br />

---

</div>

## ⚡ What It Does

Most resumes never reach a human. Applicant Tracking Systems (ATS) filter them out before anyone reads them. **ResumeATS Analyser** fixes that.

Upload your PDF resume alongside a job description and instantly receive:

- 📊 **ATS Compatibility Score** — see exactly how well your resume matches
- 🔍 **Keyword Gap Analysis** — find the skills you're missing vs. what the job requires
- 🤖 **AI Bullet Point Rewrites** — Gemini-powered suggestions to strengthen impact
- 💡 **ATS Optimization Tips** — format and structure advice to maximize parsing accuracy
- 🔒 **Secure & Private** — JWT-authenticated accounts, data processed securely

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, Vite 7, Framer Motion, Phosphor Icons |
| **Routing** | React Router v7 |
| **Data Fetching** | TanStack Query v5, Axios |
| **Backend** | Node.js, Express 4 |
| **Database** | MongoDB Atlas, Mongoose |
| **Auth** | JWT, bcryptjs |
| **AI Engine** | Google Gemini API (`@google/generative-ai`) |
| **File Parsing** | Multer, pdf-parse |
| **Deployment** | Render (full-stack, single service) |

---

## 🚀 Features

### Resume Analysis
- Upload any PDF resume (up to 10 MB)
- Paste a job description for targeted analysis
- Instant ATS compatibility score (0–100)

### AI-Powered Insights
- Identifies resume skills vs. required skills
- Surfaces missing keywords with context
- Rewrites weak bullet points into impact-driven statements
- Explains *why* each change improves ATS performance

### Authentication
- Secure register/login with JWT
- Protected routes — your analysis history is private

### Beautiful UX
- Scroll-aware animated navbar
- Framer Motion page transitions and micro-interactions
- Animated score ring with live stroke-dashoffset
- Floating particle hero with cursor-tracking glow
- Fully responsive — mobile hamburger menu

---

## 🏃 Run Locally

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Google Gemini API key

### Setup

```bash
# Clone the repo
git clone https://github.com/chiragSahani/ats-resume.git
cd ats-resume
```

**Backend:**
```bash
cd backend
cp .env.example .env
# Fill in your values in .env
npm install
npm run dev
```

**Frontend** (in a new terminal):
```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) — API calls are proxied to `localhost:5000` automatically.

### Environment Variables

Create `backend/.env` using `backend/.env.example` as a template:

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/ats-resume?retryWrites=true&w=majority
JWT_SECRET=<long-random-string>
GEMINI_API_KEY=<your-google-gemini-api-key>
NODE_ENV=development
```

---

## 📁 Project Structure

```
ats-resume/
├── backend/
│   ├── config/        # MongoDB connection
│   ├── middleware/     # JWT auth middleware
│   ├── models/        # Mongoose schemas
│   ├── routes/        # auth, resume, contact
│   └── server.js      # Express app + static serving
│
└── frontend/
    └── src/
        ├── api/        # Axios client + endpoint functions
        ├── components/ # Home, Navbar, YourResumes, Contact, ...
        ├── hooks/      # useResumeAnalysis, useContact, ...
        └── App.jsx
```

---

## 🌐 Deployment

The app is deployed as a **single Render web service** — the Express backend builds and serves the React frontend.

| Setting | Value |
|---------|-------|
| Root Directory | `backend` |
| Build Command | `npm install && npm run build` |
| Start Command | `npm start` |

The `build` script (`cd ../frontend && npm install --include=dev && npm run build`) compiles the React app into `frontend/dist/`, which Express then serves statically.

---

## 📄 License

MIT — free to use, fork, and build on.

---

<div align="center">

**Made with ❤️ for jobseekers worldwide**

[![Live Demo](https://img.shields.io/badge/Try_It_Now-00c896?style=for-the-badge)](https://ats-resume-9807.onrender.com/)

</div>
