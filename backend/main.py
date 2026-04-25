import os
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

from utils import (
    extract_text_from_pdf,
    call_groq_ai,
    parse_sections,
    parse_interview_questions,
    parse_bullet_list
)
from prompts import (
    CV_ANALYSIS_PROMPT,
    INTERVIEW_QUESTIONS_PROMPT,
    INTERVIEW_FEEDBACK_PROMPT,
    LINKEDIN_PROMPT,
    SKILLS_GAP_PROMPT,
    CAREER_ROADMAP_PROMPT
)
from database import init_db, save_cv_analysis, save_interview_session, save_linkedin_optimization

# ─────────────────────────────────────────────
# Load environment variables
# ─────────────────────────────────────────────
load_dotenv()

# ─────────────────────────────────────────────
# Create FastAPI app
# ─────────────────────────────────────────────
app = FastAPI(
    title="JobBridge AI",
    description="From Graduate to Job-Ready — AI-powered career tools",
    version="1.0.0"
)

# ─────────────────────────────────────────────
# CORS Middleware — allows frontend at localhost:5173 to call the backend
# ─────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─────────────────────────────────────────────
# Initialize database on startup
# ─────────────────────────────────────────────
@app.on_event("startup")
async def startup_event():
    init_db()


# ─────────────────────────────────────────────
# Request body models (Pydantic)
# ─────────────────────────────────────────────
class InterviewStartRequest(BaseModel):
    job_role: str

class InterviewFeedbackRequest(BaseModel):
    question: str
    answer: str
    job_role: str

class LinkedInRequest(BaseModel):
    summary: str
    job_role: str = ""   # optional

class SkillsGapRequest(BaseModel):
    cv_text: str
    job_role: str

class RoadmapRequest(BaseModel):
    current_skills: str
    target_role: str


# ─────────────────────────────────────────────
# Route 0: Health check
# ─────────────────────────────────────────────
@app.get("/")
def root():
    return {"status": "JobBridge AI is running"}


# ─────────────────────────────────────────────
# Route 1: CV Analyzer — POST /api/cv/analyze
# ─────────────────────────────────────────────
@app.post("/api/cv/analyze")
async def analyze_cv(file: UploadFile = File(...)):
    """
    Accepts a PDF CV upload, extracts text, sends to AI for analysis.
    Returns 4 sections: strengths, weak_points, missing_skills, improved_suggestions.
    """
    # Validate file type
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are accepted.")

    # Read file bytes
    file_bytes = await file.read()

    if len(file_bytes) == 0:
        raise HTTPException(status_code=400, detail="The uploaded file is empty.")

    # Extract text from PDF using PyMuPDF
    cv_text = extract_text_from_pdf(file_bytes)

    # Build the AI prompt with the CV text inserted
    prompt = CV_ANALYSIS_PROMPT.format(cv_text=cv_text)

    # Call Groq AI
    ai_response = call_groq_ai(prompt)

    # Parse the AI response into 4 sections
    sections = parse_sections(
        text=ai_response,
        headers=["STRENGTHS", "WEAK POINTS", "MISSING SKILLS", "IMPROVED SUGGESTIONS"]
    )

    # Build the final response
    result = {
        "strengths": sections.get("STRENGTHS", "No data returned"),
        "weak_points": sections.get("WEAK POINTS", "No data returned"),
        "missing_skills": sections.get("MISSING SKILLS", "No data returned"),
        "improved_suggestions": sections.get("IMPROVED SUGGESTIONS", "No data returned")
    }

    # Save to database (non-critical — don't fail if this errors)
    try:
        save_cv_analysis(cv_text, result)
    except Exception:
        pass

    return result


# ─────────────────────────────────────────────
# Route 2a: Start Interview — POST /api/interview/start
# ─────────────────────────────────────────────
@app.post("/api/interview/start")
async def start_interview(request: InterviewStartRequest):
    """
    Takes a job role and returns 4 AI-generated interview questions.
    """
    if not request.job_role.strip():
        raise HTTPException(status_code=400, detail="Job role cannot be empty.")

    # Build prompt
    prompt = INTERVIEW_QUESTIONS_PROMPT.format(job_role=request.job_role)

    # Call AI
    ai_response = call_groq_ai(prompt)

    # Parse questions from response
    questions = parse_interview_questions(ai_response)

    # Save to database
    try:
        save_interview_session(request.job_role, questions)
    except Exception:
        pass

    return {"questions": questions}


# ─────────────────────────────────────────────
# Route 2b: Interview Feedback — POST /api/interview/feedback
# ─────────────────────────────────────────────
@app.post("/api/interview/feedback")
async def interview_feedback(request: InterviewFeedbackRequest):
    """
    Takes a question + the user's answer and returns AI feedback.
    Returns: feedback text and a score label.
    """
    if not request.answer.strip():
        raise HTTPException(status_code=400, detail="Answer cannot be empty.")

    # Build prompt
    prompt = INTERVIEW_FEEDBACK_PROMPT.format(
        job_role=request.job_role,
        question=request.question,
        answer=request.answer
    )

    # Call AI
    ai_response = call_groq_ai(prompt)

    # Extract score from response (look for "SCORE: Good/Average/Needs Improvement")
    score = "Average"
    import re
    score_match = re.search(r'SCORE:\s*(.+)', ai_response, re.IGNORECASE)
    if score_match:
        score_raw = score_match.group(1).strip()
        if "good" in score_raw.lower():
            score = "Good"
        elif "needs" in score_raw.lower():
            score = "Needs Improvement"
        else:
            score = "Average"

    return {
        "feedback": ai_response,
        "score": score
    }


# ─────────────────────────────────────────────
# Route 3: LinkedIn Optimizer — POST /api/linkedin/optimize
# ─────────────────────────────────────────────
@app.post("/api/linkedin/optimize")
async def optimize_linkedin(request: LinkedInRequest):
    """
    Takes a LinkedIn summary text and optionally a job role.
    Returns an AI-rewritten, professional summary + list of improvements made.
    """
    if not request.summary.strip():
        raise HTTPException(status_code=400, detail="Summary text cannot be empty.")

    # Build prompt
    job_role_text = request.job_role if request.job_role.strip() else "Not specified"
    prompt = LINKEDIN_PROMPT.format(
        job_role=job_role_text,
        summary=request.summary
    )

    # Call AI
    ai_response = call_groq_ai(prompt)

    # Split out the improvements section from the rewritten summary
    improvements_made = []
    optimized_summary = ai_response

    import re
    improvements_match = re.search(r'IMPROVEMENTS MADE:\s*(.*?)$', ai_response, re.DOTALL | re.IGNORECASE)
    if improvements_match:
        improvements_text = improvements_match.group(1).strip()
        improvements_made = parse_bullet_list(improvements_text)
        # The optimized summary is everything before "IMPROVEMENTS MADE:"
        optimized_summary = ai_response[:improvements_match.start()].strip()

    # Save to database
    try:
        save_linkedin_optimization(request.summary, optimized_summary, request.job_role)
    except Exception:
        pass

    return {
        "optimized": optimized_summary,
        "improvements_made": improvements_made if improvements_made else [
            "Rewrote opening to be more compelling",
            "Added stronger action verbs throughout",
            "Improved professional tone and keyword density"
        ]
    }


# ─────────────────────────────────────────────
# Route 4: Skills Gap — POST /api/skills-gap
# ─────────────────────────────────────────────
@app.post("/api/skills-gap")
async def skills_gap(request: SkillsGapRequest):
    """
    Takes CV text + target job role.
    Returns: matching skills, missing skills, and recommendations.
    """
    if not request.cv_text.strip():
        raise HTTPException(status_code=400, detail="CV text cannot be empty.")
    if not request.job_role.strip():
        raise HTTPException(status_code=400, detail="Job role cannot be empty.")

    # Build prompt
    prompt = SKILLS_GAP_PROMPT.format(
        job_role=request.job_role,
        cv_text=request.cv_text
    )

    # Call AI
    ai_response = call_groq_ai(prompt)

    # Parse the 3 sections
    sections = parse_sections(
        text=ai_response,
        headers=["MATCHING SKILLS", "MISSING SKILLS", "RECOMMENDATIONS"]
    )

    # Convert skills sections into lists
    matching_list = parse_bullet_list(sections.get("MATCHING SKILLS", ""))
    missing_list = parse_bullet_list(sections.get("MISSING SKILLS", ""))
    recommendations_list = parse_bullet_list(sections.get("RECOMMENDATIONS", ""))

    return {
        "matching_skills": matching_list if matching_list else ["Could not parse matching skills"],
        "missing_skills": missing_list if missing_list else ["Could not parse missing skills"],
        "recommendations": recommendations_list if recommendations_list else ["Please try again with more detailed CV text"]
    }


# ─────────────────────────────────────────────
# Route 5 (Optional): Career Roadmap — POST /api/roadmap
# ─────────────────────────────────────────────
@app.post("/api/roadmap")
async def career_roadmap(request: RoadmapRequest):
    """
    Takes current skills + target role.
    Returns a 6-week AI-generated learning roadmap.
    """
    if not request.target_role.strip():
        raise HTTPException(status_code=400, detail="Target role cannot be empty.")

    # Build prompt
    prompt = CAREER_ROADMAP_PROMPT.format(
        target_role=request.target_role,
        current_skills=request.current_skills if request.current_skills.strip() else "Not specified"
    )

    # Call AI
    ai_response = call_groq_ai(prompt)

    # Parse weekly sections
    import re
    weeks = []
    week_pattern = re.findall(
        r'WEEK\s+(\d+):\s*\nGOAL:\s*(.+?)\nTASKS:\s*(.*?)(?=WEEK\s+\d+:|$)',
        ai_response,
        re.DOTALL | re.IGNORECASE
    )

    for match in week_pattern:
        week_num = int(match[0])
        goal = match[1].strip()
        tasks_text = match[2].strip()
        tasks = parse_bullet_list(tasks_text)
        weeks.append({
            "week": week_num,
            "goal": goal,
            "tasks": tasks
        })

    # If parsing failed, return the raw text in week 1
    if not weeks:
        weeks = [{"week": 1, "goal": "See full roadmap below", "tasks": [ai_response]}]

    return {"roadmap": weeks}
