import axios from 'axios'

// ─────────────────────────────────────────────
// Axios instance — all API calls go through this
// VITE_BACKEND_URL is set in Vercel environment variables
// ─────────────────────────────────────────────
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'https://jobbridge-ai.onrender.com',
  timeout: 60000,  // 60 seconds — AI calls can be slow
  headers: {
    'Content-Type': 'application/json',
  },
})


// ─────────────────────────────────────────────
// Feature 1: CV Analyzer
// Sends a PDF file as multipart/form-data
// ─────────────────────────────────────────────
export async function analyzeCv(formData) {
  const response = await apiClient.post('/api/cv/analyze', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',  // override for file upload
    },
  })
  return response.data
}


// ─────────────────────────────────────────────
// Feature 2: Mock Interview
// ─────────────────────────────────────────────
export async function startInterview(jobRole) {
  const response = await apiClient.post('/api/interview/start', {
    job_role: jobRole,
  })
  return response.data  // { questions: [...] }
}

export async function submitAnswer(question, answer, jobRole) {
  const response = await apiClient.post('/api/interview/feedback', {
    question: question,
    answer: answer,
    job_role: jobRole,
  })
  return response.data  // { feedback: "...", score: "Good/Average/Needs Improvement" }
}


// ─────────────────────────────────────────────
// Feature 3: LinkedIn Optimizer
// ─────────────────────────────────────────────
export async function optimizeLinkedIn(summary, jobRole = '') {
  const response = await apiClient.post('/api/linkedin/optimize', {
    summary: summary,
    job_role: jobRole,
  })
  return response.data  // { optimized: "...", improvements_made: [...] }
}


// ─────────────────────────────────────────────
// Feature 4: Skills Gap Analysis
// ─────────────────────────────────────────────
export async function analyzeSkillsGap(cvText, jobRole) {
  const response = await apiClient.post('/api/skills-gap', {
    cv_text: cvText,
    job_role: jobRole,
  })
  return response.data  // { matching_skills: [...], missing_skills: [...], recommendations: [...] }
}


// ─────────────────────────────────────────────
// Feature 5 (Optional): Career Roadmap
// ─────────────────────────────────────────────
export async function getCareerRoadmap(currentSkills, targetRole) {
  const response = await apiClient.post('/api/roadmap', {
    current_skills: currentSkills,
    target_role: targetRole,
  })
  return response.data  // { roadmap: [{ week: 1, goal: "...", tasks: [...] }] }
}

export default apiClient