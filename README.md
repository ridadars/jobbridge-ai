#  JobBridge AI — From Graduate to Job-Ready

An AI-powered web app that helps university students and graduates become job-ready.
Built with FastAPI + React + Groq (Llama 3 70B).

---

##  Features

| Feature | Description |
|---|---|
|  CV Analyzer | Upload PDF → AI feedback on strengths, weaknesses, missing skills |
|  Mock Interview | Enter job role → 4 AI questions → answer → get feedback |
|  LinkedIn Optimizer | Paste summary → AI rewrites it professionally |
|  Skills Gap | Paste CV + target role → see what you have vs. need |

---

##  Tech Stack

- **Backend:** Python 3.10+, FastAPI, SQLite, PyMuPDF, Groq API
- **Frontend:** React 18, Vite, Tailwind CSS v3, Axios, React Router v6

---

##  Quick Setup

### Step 1 — Get a Groq API Key (Free)

1. Go to [console.groq.com](https://console.groq.com)
2. Sign up for a free account
3. Click **API Keys** → **Create API Key**
4. Copy the key — you'll need it in Step 3

---

### Step 2 — Clone / Extract the Project

If you downloaded a zip, extract it. Then open TWO terminal windows.

---

### Step 3 — Backend Setup

In Terminal 1:

```bash
cd jobbridge-ai/backend

# Install Python dependencies
pip install -r requirements.txt

# Create your .env file
cp ../.env.example .env
```

Now open `backend/.env` in any text editor and paste your Groq API key:

```
GROQ_API_KEY=gsk_your_actual_key_here
```

Start the backend server:

```bash
uvicorn main:app --reload --port 8000
```

You should see:
```
 Database initialized successfully.
INFO:     Uvicorn running on http://127.0.0.1:8000
```

---

### Step 4 — Frontend Setup

In Terminal 2:

```bash
cd jobbridge-ai/frontend

# Install Node dependencies
npm install

# Create frontend .env file
echo "VITE_API_URL=http://localhost:8000" > .env

# Start the dev server
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms
  ➜  Local:   http://localhost:5173/
```

---

### Step 5 — Open the App

Go to: **http://localhost:5173**

---

##  Backend API Endpoints

Base URL: `http://localhost:8000`

### 1) Health Check
- **Method:** `GET`
- **Path:** `/`
- **Purpose:** Confirms backend is running
- **Response:**

```json
{
  "status": "JobBridge AI is running"
}
```

### 2) CV Analyzer
- **Method:** `POST`
- **Path:** `/api/cv/analyze`
- **Content-Type:** `multipart/form-data`
- **Body:** `file` (PDF)
- **Response:**

```json
{
  "strengths": "...",
  "weak_points": "...",
  "missing_skills": "...",
  "improved_suggestions": "..."
}
```

### 3) Start Interview
- **Method:** `POST`
- **Path:** `/api/interview/start`
- **Content-Type:** `application/json`
- **Body:**

```json
{
  "job_role": "Software Engineer"
}
```

- **Response:**

```json
{
  "questions": ["...", "...", "...", "..."]
}
```

### 4) Interview Feedback
- **Method:** `POST`
- **Path:** `/api/interview/feedback`
- **Content-Type:** `application/json`
- **Body:**

```json
{
  "question": "Tell me about yourself",
  "answer": "...",
  "job_role": "Software Engineer"
}
```

- **Response:**

```json
{
  "feedback": "...",
  "score": "Good"
}
```

### 5) LinkedIn Optimizer
- **Method:** `POST`
- **Path:** `/api/linkedin/optimize`
- **Content-Type:** `application/json`
- **Body:**

```json
{
  "summary": "I am a graduate seeking opportunities",
  "job_role": "Data Analyst"
}
```

- **Response:**

```json
{
  "optimized": "...",
  "improvements_made": ["...", "...", "..."]
}
```

### 6) Skills Gap Analysis
- **Method:** `POST`
- **Path:** `/api/skills-gap`
- **Content-Type:** `application/json`
- **Body:**

```json
{
  "cv_text": "...",
  "job_role": "Data Analyst"
}
```

- **Response:**

```json
{
  "matching_skills": ["..."],
  "missing_skills": ["..."],
  "recommendations": ["..."]
}
```

### 7) Career Roadmap
- **Method:** `POST`
- **Path:** `/api/roadmap`
- **Content-Type:** `application/json`
- **Body:**

```json
{
  "current_skills": "Python, SQL",
  "target_role": "ML Engineer"
}
```

- **Response:**

```json
{
  "roadmap": [
    {
      "week": 1,
      "goal": "...",
      "tasks": ["...", "..."]
    }
  ]
}
```

### 8) Auto-generated FastAPI Docs
- `GET /docs` → Swagger UI
- `GET /redoc` → ReDoc
- `GET /openapi.json` → OpenAPI schema

---

##  Serverless Ready (Vercel)

Backend is now configured for Vercel serverless runtime.

- Serverless entrypoint: `api/index.py`
- Vercel routing config: `vercel.json`
- SQLite fallback on Vercel: uses `/tmp/jobbridge.db`

When you deploy later, set these Vercel environment variables:

- `GROQ_API_KEY`
- `GROQ_MODEL` (optional)

Local dev remains the same:

```bash
cd backend
uvicorn main:app --reload --port 8000
```

---

##  Quick Test Checklist

###  Feature 1 — CV Analyzer
1. Go to `/cv`
2. Upload any PDF (your CV, or any text PDF)
3. Click **Analyze My CV**
4. Wait 10-15 seconds
5.  Should see 4 result cards: Strengths, Weak Points, Missing Skills, Suggestions

###  Feature 2 — Mock Interview
1. Go to `/interview`
2. Type `Software Engineer` in the role box
3. Click **Generate Interview Questions**
4.  Should see Question 1 of 4
5. Type any answer and click **Submit Answer**
6.  Should see AI feedback with a score (Good/Average/Needs Improvement)
7. Click **Next Question** and repeat
8.  After 4 questions, should see full summary

###  Feature 3 — LinkedIn Optimizer
1. Go to `/linkedin`
2. Paste any text in the summary box (even "I am a graduate seeking opportunities")
3. Click **Optimize My LinkedIn**
4.  Should see original vs AI-optimized version side by side
5.  Improvements Made list should appear below

###  Feature 4 — Skills Gap
1. Go to `/skills-gap`
2. Paste any CV text into the textarea
3. Type `Data Analyst` as target role
4. Click **Analyze Skills Gap**
5.  Should see green column (skills you have) and red column (skills needed)
6.  Recommendations section should appear below

###  Backend Health Check
- Open: http://localhost:8000
- Should return: `{"status": "JobBridge AI is running"}`
- Open: http://localhost:8000/docs
-  Should show interactive API documentation

---

##  Troubleshooting

**"GROQ_API_KEY not found" error:**
- Make sure you created `backend/.env` with your key
- Restart the backend server after editing .env

**"Could not extract text from PDF":**
- Make sure your PDF has real text (not a scanned image)
- Try a different PDF

**Frontend can't connect to backend:**
- Make sure backend is running on port 8000
- Make sure `frontend/.env` has `VITE_API_URL=http://localhost:8000`
- Restart `npm run dev` after editing .env

**"AI service temporarily unavailable":**
- Check your Groq API key is correct
- Check console.groq.com for rate limit status
- Try again in 30 seconds

---

##  Project Structure

```
jobbridge-ai/
├── backend/
│   ├── main.py          ← All API routes
│   ├── utils.py         ← PDF parsing + AI calls
│   ├── database.py      ← SQLite logging
│   ├── prompts.py       ← All AI prompts
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── pages/       ← One file per feature
│   │   ├── components/  ← Reusable UI pieces
│   │   └── api/         ← All API call functions
│   └── package.json
└── .env.example
```

---

Built for hackathon  • Powered by [Groq](https://groq.com) + Llama 3 70B
