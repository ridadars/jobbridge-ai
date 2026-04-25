import { useState } from 'react'
import LoadingSpinner from '../components/LoadingSpinner'
import { getCareerRoadmap } from '../api/client'

const WEEK_ACCENTS = ['#FFD84D', '#FACC15', '#FFF2A6', '#FFE066', '#FFD84D', '#FACC15']

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

.week-card {
  flex: 1;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.03);
  transition: 0.3s ease;
}
.week-card:hover {
  border-color: rgba(255,216,77,0.18);
  background: rgba(255,255,255,0.05);
}
`

function CareerRoadmap() {
  const [currentSkills, setCurrentSkills] = useState('')
  const [targetRole, setTargetRole]       = useState('')
  const [loading, setLoading]             = useState(false)
  const [roadmap, setRoadmap]             = useState(null)
  const [error, setError]                 = useState('')

  async function handleGenerate() {
    if (!targetRole.trim()) { setError('Please enter a target role.'); return }
    setLoading(true); setError(''); setRoadmap(null)
    try {
      const data = await getCareerRoadmap(currentSkills, targetRole)
      setRoadmap(data.roadmap)
    } catch (err) {
      setError(err.response?.data?.detail || 'Something went wrong. Please try again.')
    } finally { setLoading(false) }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: `
        radial-gradient(circle at 75% 20%, rgba(59,130,246,0.25), transparent 30%),
        radial-gradient(circle at 35% 40%, rgba(29,78,216,0.18), transparent 35%),
        linear-gradient(135deg, #020617 0%, #081225 45%, #0B1D3A 100%)
      `,
      color: '#F8FAFC',
    }}>
      <style>{css}</style>

      <div style={{ position: 'fixed', top: '10%', right: '-180px', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(37,99,235,0.18)', filter: 'blur(120px)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', bottom: '10%', left: '-120px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(96,165,250,0.08)', filter: 'blur(100px)', pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '860px', margin: '0 auto', padding: '80px 40px 80px' }}>

        {/* Header */}
        <div style={{ marginBottom: '36px' }}>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#FFD84D', marginBottom: '16px', fontWeight: 600 }}>
            MODULE 05
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(255,216,77,0.08)', border: '1px solid rgba(255,216,77,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFD84D', flexShrink: 0 }}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 17l4-8 4 4 4-6 4 10"/>
                <path d="M21 21H3"/>
              </svg>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1, letterSpacing: '-0.03em', color: '#F8FAFC' }}>
              Career Path
            </h1>
          </div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', lineHeight: 1.8, color: 'rgba(255,255,255,0.6)', maxWidth: '560px', fontWeight: 300 }}>
            Specify where you are and where you want to go. The AI will generate a precise week-by-week learning plan to bridge the gap.
          </p>
        </div>

        {/* Input card */}
        <div className="glass-card" style={{ padding: '32px', marginBottom: '20px' }}>
          <div style={{ marginBottom: '20px' }}>
            <label className="page-label">
              Current Skills{' '}
              <span style={{ textTransform: 'none', letterSpacing: 0, fontSize: '11px', fontWeight: 300, color: 'rgba(255,255,255,0.3)' }}>(optional)</span>
            </label>
            <textarea
              value={currentSkills}
              onChange={e => { setCurrentSkills(e.target.value); setError('') }}
              rows={4}
              placeholder="e.g. Python basics, some SQL, university stats projects..."
              className="page-input"
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label className="page-label">Target Role</label>
            <input
              type="text"
              value={targetRole}
              onChange={e => { setTargetRole(e.target.value); setError('') }}
              onKeyDown={e => e.key === 'Enter' && handleGenerate()}
              placeholder="e.g. Data Engineer, Full Stack Developer, ML Engineer"
              className="page-input"
            />
          </div>

          {error && (
            <div className="error-banner">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {error}
            </div>
          )}

          <button onClick={handleGenerate} disabled={loading || !targetRole.trim()} className="btn-primary">
            {loading ? 'Generating Roadmap...' : 'Generate 6-Week Path'}
          </button>
        </div>

        {loading && <LoadingSpinner message="Engineering your career roadmap..." />}

        {roadmap && !loading && (
          <div>
            {/* Roadmap header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em', color: '#FFD84D', textTransform: 'uppercase' }}>
                Roadmap
              </span>
              <div style={{ height: '1px', flex: 1, minWidth: '40px', background: 'linear-gradient(90deg, rgba(255,216,77,0.4), transparent)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '16px', fontWeight: 600, color: '#F8FAFC', fontStyle: 'italic' }}>{targetRole}</span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: '4px', background: 'rgba(255,216,77,0.1)', border: '1px solid rgba(255,216,77,0.25)', color: '#FFD84D' }}>
                  {roadmap.length} WKS
                </span>
              </div>
            </div>

            {/* Timeline */}
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '18px', top: '20px', bottom: '20px', width: '1px', background: 'linear-gradient(180deg, rgba(255,216,77,0.3) 0%, rgba(255,216,77,0.2) 80%, transparent 100%)' }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {roadmap.map((week, i) => {
                  const accent = WEEK_ACCENTS[i % WEEK_ACCENTS.length]
                  return (
                    <div key={week.week} style={{ display: 'flex', gap: '18px', alignItems: 'flex-start' }}>
                      {/* Week node */}
                      <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(255,216,77,0.06)', border: `1px solid rgba(255,216,77,0.2)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1 }}>
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', color: '#FFD84D', fontWeight: 700, letterSpacing: '0.06em' }}>
                          W{week.week}
                        </span>
                      </div>

                      {/* Week card */}
                      <div className="week-card" style={{ borderLeft: `2px solid ${accent}50` }}>
                        <div style={{ padding: '12px 18px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,216,77,0.04)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px', color: '#FFD84D', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600 }}>
                            Week {week.week}
                          </span>
                          <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '10px' }}>—</span>
                          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '14px', fontWeight: 600, color: '#F8FAFC', letterSpacing: '-0.01em' }}>
                            {week.goal}
                          </span>
                        </div>

                        <div style={{ padding: '14px 18px' }}>
                          {Array.isArray(week.tasks) && week.tasks.length > 0 ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                              {week.tasks.map((task, j) => (
                                <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                                  <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#FFD84D', flexShrink: 0, marginTop: '8px', opacity: 0.6 }} />
                                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, fontWeight: 300 }}>{task}</span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, fontWeight: 300, whiteSpace: 'pre-wrap' }}>
                              {typeof week.tasks === 'string' ? week.tasks : 'No tasks listed'}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Footer CTA */}
            <div style={{ marginTop: '36px', background: 'rgba(255,216,77,0.04)', border: '1px solid rgba(255,216,77,0.15)', borderRadius: '20px', padding: '32px', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '22px', color: '#F8FAFC', fontStyle: 'italic', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                6 weeks. Consistent effort. New career.
              </div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.5)', fontWeight: 300, lineHeight: 1.8, maxWidth: '420px', margin: '0 auto' }}>
                Track your progress, stay consistent, and remember — every expert was once a beginner with a roadmap exactly like this one.
              </p>
            </div>

            <button
              onClick={() => { setRoadmap(null); setCurrentSkills(''); setTargetRole('') }}
              style={{ marginTop: '20px', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,216,77,0.5)', fontFamily: 'Inter, sans-serif', fontSize: '12px', letterSpacing: '0.1em', textDecoration: 'underline', textUnderlineOffset: '3px' }}
            >
              Generate for a different role
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CareerRoadmap