import { useState } from 'react'
import LoadingSpinner from '../components/LoadingSpinner'
import { startInterview, submitAnswer } from '../api/client'

const VIEW_SETUP     = 'setup'
const VIEW_INTERVIEW = 'interview'
const VIEW_SUMMARY   = 'summary'

const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,700&family=Inter:wght@300;400;500;600;700&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

.page-label {
  font-family: Inter, sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255,216,77,0.8);
  display: block;
  margin-bottom: 10px;
}

.page-input {
  width: 100%;
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.04);
  color: #F8FAFC;
  font-family: Inter, sans-serif;
  font-size: 14px;
  font-weight: 300;
  line-height: 1.7;
  outline: none;
  transition: 0.2s ease;
  resize: none;
}
.page-input::placeholder { color: rgba(255,255,255,0.22); }
.page-input:focus {
  border-color: rgba(255,216,77,0.35);
  background: rgba(255,255,255,0.06);
}

.btn-primary {
  padding: 14px 30px;
  border: none;
  border-radius: 10px;
  background: #FFD84D;
  color: #111827;
  font-family: Inter, sans-serif;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: 0.25s ease;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  letter-spacing: 0.01em;
}
.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(250,204,21,0.25);
}
.btn-primary:disabled { opacity: 0.4; cursor: not-allowed; }

.glass-card {
  border-radius: 20px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  backdrop-filter: blur(18px);
}

.error-banner {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 12px 16px;
  border-radius: 10px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,100,100,0.2);
  color: rgba(255,160,160,0.9);
  font-family: Inter, sans-serif;
  font-size: 13px;
  font-weight: 300;
  line-height: 1.6;
  margin-bottom: 16px;
}

.badge {
  font-family: Inter, sans-serif;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 4px 12px;
  border-radius: 6px;
  background: rgba(255,216,77,0.1);
  border: 1px solid rgba(255,216,77,0.25);
  color: #FFD84D;
}
`

const pageWrap = {
  minHeight: '100vh',
  background: `
    radial-gradient(circle at 75% 20%, rgba(59,130,246,0.25), transparent 30%),
    radial-gradient(circle at 35% 40%, rgba(29,78,216,0.18), transparent 35%),
    linear-gradient(135deg, #020617 0%, #081225 45%, #0B1D3A 100%)
  `,
  color: '#F8FAFC',
}

const glowA = { position: 'fixed', top: '10%', right: '-180px', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(37,99,235,0.18)', filter: 'blur(120px)', pointerEvents: 'none', zIndex: 0 }
const glowB = { position: 'fixed', bottom: '10%', left: '-120px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(96,165,250,0.08)', filter: 'blur(100px)', pointerEvents: 'none', zIndex: 0 }

function ScoreBadge({ score }) {
  return (
    <span style={{
      background: 'rgba(255,216,77,0.1)',
      border: '1px solid rgba(255,216,77,0.28)',
      color: '#FFD84D',
      fontFamily: 'Inter, sans-serif',
      fontSize: '10px',
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      padding: '3px 10px',
      borderRadius: '4px',
      fontWeight: 600,
    }}>
      {score}
    </span>
  )
}

function PageH1({ children }) {
  return (
    <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1, letterSpacing: '-0.03em', color: '#F8FAFC' }}>
      {children}
    </h1>
  )
}

function Interview() {
  const [view, setView]                   = useState(VIEW_SETUP)
  const [jobRole, setJobRole]             = useState('')
  const [questions, setQuestions]         = useState([])
  const [currentIndex, setCurrentIndex]   = useState(0)
  const [currentAnswer, setCurrentAnswer] = useState('')
  const [loading, setLoading]             = useState(false)
  const [error, setError]                 = useState('')
  const [sessionResults, setSessionResults] = useState([])

  async function handleStartInterview() {
    if (!jobRole.trim()) { setError('Please enter a job role.'); return }
    setLoading(true); setError('')
    try {
      const data = await startInterview(jobRole)
      setQuestions(data.questions)
      setCurrentIndex(0); setSessionResults([]); setCurrentAnswer('')
      setView(VIEW_INTERVIEW)
    } catch (err) {
      setError(err.response?.data?.detail || 'Could not generate questions. Please try again.')
    } finally { setLoading(false) }
  }

  async function handleSubmitAnswer() {
    if (!currentAnswer.trim()) { setError('Please type your answer before submitting.'); return }
    setLoading(true); setError('')
    try {
      const data = await submitAnswer(questions[currentIndex], currentAnswer, jobRole)
      setSessionResults(prev => [...prev, {
        question: questions[currentIndex],
        answer: currentAnswer,
        feedback: data.feedback,
        score: data.score,
      }])
    } catch (err) {
      setError(err.response?.data?.detail || 'Could not get feedback. Please try again.')
    } finally { setLoading(false) }
  }

  function handleNext() {
    if (currentIndex + 1 >= questions.length) setView(VIEW_SUMMARY)
    else { setCurrentIndex(prev => prev + 1); setCurrentAnswer(''); setError('') }
  }

  const currentResult = sessionResults[currentIndex]
  const progress = ((currentIndex + 1) / Math.max(questions.length, 1)) * 100

  // ── SETUP ──────────────────────────────────────────────────────────────
  if (view === VIEW_SETUP) {
    return (
      <div style={pageWrap}>
        <style>{css}</style>
        <div style={glowA} /><div style={glowB} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '580px', margin: '0 auto', padding: '80px 40px 80px' }}>
          <div style={{ marginBottom: '36px' }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#FFD84D', marginBottom: '16px', fontWeight: 600 }}>MODULE 02</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(255,216,77,0.08)', border: '1px solid rgba(255,216,77,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFD84D', flexShrink: 0 }}>
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <PageH1>AI Interview</PageH1>
            </div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', lineHeight: 1.8, color: 'rgba(255,255,255,0.6)', fontWeight: 300 }}>
              Enter your target role to receive 4 AI-generated interview questions with real-time scoring and feedback.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '32px' }}>
            <label className="page-label">Target Role</label>
            <input
              type="text"
              value={jobRole}
              onChange={e => { setJobRole(e.target.value); setError('') }}
              onKeyDown={e => e.key === 'Enter' && handleStartInterview()}
              placeholder="e.g. Software Engineer, Data Analyst, Product Manager"
              className="page-input"
              style={{ marginBottom: error ? '0' : '20px' }}
            />
            {error && <div className="error-banner" style={{ marginTop: '12px' }}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>{error}</div>}
            <button onClick={handleStartInterview} disabled={loading} className="btn-primary" style={{ marginTop: '20px' }}>
              {loading ? 'Preparing Session...' : 'Initialize Interview'}
            </button>
          </div>

          {loading && <LoadingSpinner message="Generating interview questions..." />}
        </div>
      </div>
    )
  }

  // ── INTERVIEW ───────────────────────────────────────────────────────────
  if (view === VIEW_INTERVIEW) {
    return (
      <div style={pageWrap}>
        <style>{css}</style>
        <div style={glowA} /><div style={glowB} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '660px', margin: '0 auto', padding: '80px 40px 80px' }}>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <PageH1>AI Interview</PageH1>
            <span className="badge">{currentIndex + 1} / {questions.length}</span>
          </div>

          {/* Progress */}
          <div style={{ width: '100%', height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', overflow: 'hidden', marginBottom: '32px' }}>
            <div style={{ height: '100%', background: 'linear-gradient(90deg, #FFD84D, #FACC15)', borderRadius: '99px', width: `${progress}%`, transition: 'width 0.4s ease' }} />
          </div>

          {/* Question */}
          <div style={{ background: 'rgba(255,216,77,0.04)', border: '1px solid rgba(255,216,77,0.15)', borderLeft: '3px solid rgba(255,216,77,0.5)', borderRadius: '14px', padding: '24px', marginBottom: '28px' }}>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', letterSpacing: '0.18em', color: '#FFD84D', textTransform: 'uppercase', display: 'block', marginBottom: '12px', fontWeight: 600 }}>
              Question {currentIndex + 1}
            </span>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', fontWeight: 600, color: '#F8FAFC', lineHeight: 1.55, letterSpacing: '-0.01em' }}>
              {questions[currentIndex]}
            </p>
          </div>

          {!currentResult && (
            <>
              <label className="page-label">Your Response</label>
              <textarea
                value={currentAnswer}
                onChange={e => { setCurrentAnswer(e.target.value); setError('') }}
                rows={6}
                placeholder="Type your answer here..."
                className="page-input"
                style={{ marginBottom: '16px' }}
              />
              {error && <div className="error-banner"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>{error}</div>}
              <button onClick={handleSubmitAnswer} disabled={loading} className="btn-primary">
                {loading ? 'Evaluating...' : 'Submit Response'}
              </button>
              {loading && <LoadingSpinner message="Evaluating your answer..." />}
            </>
          )}

          {currentResult && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="glass-card" style={{ padding: '20px' }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 600, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>Your Answer</span>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, fontWeight: 300 }}>{currentResult.answer}</p>
              </div>

              <div className="glass-card" style={{ padding: '20px', borderColor: 'rgba(255,216,77,0.15)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.16em', color: '#FFD84D', textTransform: 'uppercase' }}>AI Feedback</span>
                  <ScoreBadge score={currentResult.score} />
                </div>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.72)', lineHeight: 1.8, fontWeight: 300, whiteSpace: 'pre-wrap' }}>{currentResult.feedback}</p>
              </div>

              <button onClick={handleNext} className="btn-primary">
                {currentIndex + 1 >= questions.length ? 'View Summary' : 'Next Question'}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  // ── SUMMARY ─────────────────────────────────────────────────────────────
  if (view === VIEW_SUMMARY) {
    const goodCount = sessionResults.filter(r => r.score === 'Good').length
    const pct = Math.round((goodCount / sessionResults.length) * 100)

    return (
      <div style={pageWrap}>
        <style>{css}</style>
        <div style={glowA} /><div style={glowB} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '740px', margin: '0 auto', padding: '80px 40px 80px' }}>

          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#FFD84D', marginBottom: '16px', fontWeight: 600 }}>Session Complete</div>
          <PageH1>Session Report</PageH1>
          <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(255,216,77,0.4), transparent)', margin: '24px 0 28px' }} />

          {/* Score banner */}
          <div className="glass-card" style={{ padding: '32px', display: 'flex', alignItems: 'center', gap: '32px', marginBottom: '28px', flexWrap: 'wrap', borderColor: 'rgba(255,216,77,0.15)' }}>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '56px', color: '#FFD84D', letterSpacing: '-0.05em', lineHeight: 1 }}>
                {goodCount}<span style={{ fontSize: '28px', opacity: 0.4 }}>/{sessionResults.length}</span>
              </div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: '6px', fontWeight: 600 }}>
                Good Answers
              </div>
            </div>
            <div style={{ flex: 1, minWidth: '180px' }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '16px', fontWeight: 600, color: '#F8FAFC', marginBottom: '14px', fontStyle: 'italic' }}>
                {pct >= 75 ? "Outstanding — you're ready." : pct >= 50 ? 'Solid effort. More reps and you\'ll nail it.' : 'Keep grinding — every session compounds.'}
              </div>
              <div style={{ width: '100%', height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', overflow: 'hidden' }}>
                <div style={{ height: '100%', background: 'linear-gradient(90deg, #FFD84D, #FACC15)', borderRadius: '99px', width: `${pct}%`, transition: 'width 0.4s ease' }} />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
            {sessionResults.map((result, i) => (
              <div key={i} className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '12px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,216,77,0.03)' }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#FFD84D', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600 }}>Q{i + 1}</span>
                  <ScoreBadge score={result.score} />
                </div>
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.14em', textTransform: 'uppercase', display: 'block', marginBottom: '8px', fontWeight: 600 }}>Question</span>
                    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '15px', fontWeight: 600, color: '#F8FAFC', lineHeight: 1.5 }}>{result.question}</p>
                  </div>
                  <div>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.14em', textTransform: 'uppercase', display: 'block', marginBottom: '8px', fontWeight: 600 }}>Your Answer</span>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.5)', fontWeight: 300, lineHeight: 1.7 }}>{result.answer}</p>
                  </div>
                  <div>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.14em', textTransform: 'uppercase', display: 'block', marginBottom: '8px', fontWeight: 600 }}>Feedback</span>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.65)', fontWeight: 300, lineHeight: 1.75, whiteSpace: 'pre-wrap' }}>{result.feedback}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => { setView(VIEW_SETUP); setJobRole(''); setQuestions([]); setSessionResults([]); setCurrentIndex(0); setCurrentAnswer('') }}
            className="btn-primary"
          >
            Start New Session
          </button>
        </div>
      </div>
    )
  }

  return null
}

export default Interview