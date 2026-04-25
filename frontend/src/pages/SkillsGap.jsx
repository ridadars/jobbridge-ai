import { useState } from 'react'
import LoadingSpinner from '../components/LoadingSpinner'
import { analyzeSkillsGap } from '../api/client'

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

function SkillsGap() {
  const [cvText, setCvText]   = useState('')
  const [jobRole, setJobRole] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError]     = useState('')

  async function handleAnalyze() {
    if (!cvText.trim()) { setError('Please paste your CV text.'); return }
    if (!jobRole.trim()) { setError('Please enter a target job role.'); return }
    setLoading(true); setError(''); setResults(null)
    try {
      const data = await analyzeSkillsGap(cvText, jobRole)
      setResults(data)
    } catch (err) {
      setError(err.response?.data?.detail || 'Something went wrong. Please try again.')
    } finally { setLoading(false) }
  }

  return (
    <div style={pageWrap}>
      <style>{css}</style>
      <div style={glowA} /><div style={glowB} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '580px', margin: '0 auto', padding: '80px 40px 80px' }}>

        {/* Header */}
        <div style={{ marginBottom: '36px' }}>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#FFD84D', marginBottom: '16px', fontWeight: 600 }}>
            MODULE 04
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(255,216,77,0.08)', border: '1px solid rgba(255,216,77,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFD84D', flexShrink: 0 }}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1, letterSpacing: '-0.03em', color: '#F8FAFC' }}>
              Skills Radar
            </h1>
          </div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', lineHeight: 1.8, color: 'rgba(255,255,255,0.6)', maxWidth: '560px', fontWeight: 300 }}>
            Paste your CV and specify a target role. The AI will map your current skills against role requirements and surface the exact gaps to close.
          </p>
        </div>

        {/* Input card */}
        <div className="glass-card" style={{ padding: '32px', marginBottom: '20px' }}>
          <div style={{ marginBottom: '20px' }}>
            <label className="page-label">CV Text</label>
            <textarea
              value={cvText}
              onChange={e => { setCvText(e.target.value); setError('') }}
              rows={8}
              placeholder="Paste the full text of your CV here..."
              className="page-input"
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label className="page-label">Target Role</label>
            <input
              type="text"
              value={jobRole}
              onChange={e => { setJobRole(e.target.value); setError('') }}
              placeholder="e.g. Data Analyst, Frontend Developer, DevOps Engineer"
              className="page-input"
            />
          </div>

          {error && (
            <div className="error-banner">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {error}
            </div>
          )}

          <button onClick={handleAnalyze} disabled={loading || !cvText.trim() || !jobRole.trim()} className="btn-primary">
            {loading ? 'Scanning Skills...' : 'Run Skills Radar'}
          </button>
        </div>

        {loading && <LoadingSpinner message="Mapping your skills against role requirements..." />}

        {results && !loading && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em', color: '#FFD84D', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                Radar Output — {jobRole}
              </span>
              <div style={{ height: '1px', flex: 1, background: 'linear-gradient(90deg, rgba(255,216,77,0.4), transparent)' }} />
            </div>

            {/* Skills columns */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '16px' }}>

              {/* Confirmed */}
              <div className="glass-card" style={{ padding: 0, overflow: 'hidden', borderColor: 'rgba(255,216,77,0.15)' }}>
                <div style={{ padding: '12px 20px', borderBottom: '1px solid rgba(255,216,77,0.1)', background: 'rgba(255,216,77,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', color: '#FFD84D', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600 }}>Confirmed Skills</span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#FFD84D', background: 'rgba(255,216,77,0.1)', border: '1px solid rgba(255,216,77,0.25)', borderRadius: '4px', padding: '2px 8px', fontWeight: 600 }}>
                    {results.matching_skills.length}
                  </span>
                </div>
                <div style={{ padding: '18px 20px' }}>
                  {results.matching_skills.length === 0 ? (
                    <p style={{ color: 'rgba(255,255,255,0.25)', fontStyle: 'italic', fontSize: '13px', fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>No matching skills found</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {results.matching_skills.map((skill, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ width: '18px', height: '18px', borderRadius: '5px', background: 'rgba(255,216,77,0.08)', border: '1px solid rgba(255,216,77,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#FFD84D" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                          </div>
                          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.75)', fontWeight: 400 }}>{skill}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Gaps */}
              <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '12px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600 }}>Skill Gaps</span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', padding: '2px 8px', fontWeight: 600 }}>
                    {results.missing_skills.length}
                  </span>
                </div>
                <div style={{ padding: '18px 20px' }}>
                  {results.missing_skills.length === 0 ? (
                    <p style={{ color: 'rgba(255,255,255,0.25)', fontStyle: 'italic', fontSize: '13px', fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>No major gaps — you're ready!</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {results.missing_skills.map((skill, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ width: '18px', height: '18px', borderRadius: '5px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="3" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                          </div>
                          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.65)', fontWeight: 400 }}>{skill}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="glass-card" style={{ padding: 0, overflow: 'hidden', marginBottom: '20px', borderColor: 'rgba(255,216,77,0.12)' }}>
              <div style={{ padding: '12px 20px', borderBottom: '1px solid rgba(255,216,77,0.1)', background: 'rgba(255,216,77,0.04)' }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', color: '#FFD84D', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600 }}>Recommended Actions</span>
              </div>
              <div style={{ padding: '20px' }}>
                {results.recommendations.length === 0 ? (
                  <p style={{ color: 'rgba(255,255,255,0.25)', fontStyle: 'italic', fontSize: '13px', fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>No recommendations available.</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {results.recommendations.map((rec, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                        <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: 'rgba(255,216,77,0.08)', border: '1px solid rgba(255,216,77,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px', fontFamily: 'Inter, sans-serif', fontSize: '10px', color: '#FFD84D', fontWeight: 700 }}>
                          {String(i + 1).padStart(2, '0')}
                        </div>
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, fontWeight: 300 }}>{rec}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => { setResults(null); setCvText(''); setJobRole('') }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,216,77,0.5)', fontFamily: 'Inter, sans-serif', fontSize: '12px', letterSpacing: '0.1em', textDecoration: 'underline', textUnderlineOffset: '3px' }}
            >
              Analyze a different role
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default SkillsGap