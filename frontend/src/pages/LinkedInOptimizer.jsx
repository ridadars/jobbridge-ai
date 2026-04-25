import { useState } from 'react'
import LoadingSpinner from '../components/LoadingSpinner'
import { optimizeLinkedIn } from '../api/client'

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

.copy-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  background: none;
  border: 1px solid rgba(255,216,77,0.2);
  border-radius: 6px;
  padding: 4px 10px;
  cursor: pointer;
  color: rgba(255,216,77,0.6);
  font-family: Inter, sans-serif;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: all 0.2s;
}
.copy-btn:hover { border-color: rgba(255,216,77,0.4); color: #FFD84D; }
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

function LinkedInOptimizer() {
  const [summary, setSummary] = useState('')
  const [jobRole, setJobRole] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError]     = useState('')
  const [copied, setCopied]   = useState(false)

  async function handleOptimize() {
    if (!summary.trim()) { setError('Please paste your LinkedIn summary first.'); return }
    setLoading(true); setError(''); setResults(null)
    try {
      const data = await optimizeLinkedIn(summary, jobRole)
      setResults(data)
    } catch (err) {
      setError(err.response?.data?.detail || 'Something went wrong. Please try again.')
    } finally { setLoading(false) }
  }

  function handleCopy() {
    if (!results?.optimized) return
    navigator.clipboard.writeText(results.optimized).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div style={pageWrap}>
      <style>{css}</style>
      <div style={glowA} /><div style={glowB} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '580px', margin: '0 auto', padding: '80px 40px 80px' }}>

        {/* Header */}
        <div style={{ marginBottom: '36px' }}>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#FFD84D', marginBottom: '16px', fontWeight: 600 }}>
            MODULE 03
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(255,216,77,0.08)', border: '1px solid rgba(255,216,77,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFD84D', flexShrink: 0 }}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                <polyline points="17 6 23 6 23 12"/>
              </svg>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1, letterSpacing: '-0.03em', color: '#F8FAFC' }}>
              Profile Boost
            </h1>
          </div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', lineHeight: 1.8, color: 'rgba(255,255,255,0.6)', maxWidth: '560px', fontWeight: 300 }}>
            Paste your LinkedIn About section and the AI will rewrite it to be keyword-optimized, compelling, and recruiter-ready.
          </p>
        </div>

        {/* Input card */}
        <div className="glass-card" style={{ padding: '32px', marginBottom: '20px' }}>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <label className="page-label" style={{ marginBottom: 0 }}>Current LinkedIn Summary</label>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: summary.length < 50 ? 'rgba(255,255,255,0.2)' : 'rgba(255,216,77,0.5)', fontWeight: 500 }}>
                {summary.length} chars
              </span>
            </div>
            <textarea
              value={summary}
              onChange={e => { setSummary(e.target.value); setError('') }}
              rows={7}
              placeholder="Paste your current LinkedIn About section here..."
              className="page-input"
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label className="page-label">
              Target Role{' '}
              <span style={{ textTransform: 'none', letterSpacing: 0, fontSize: '11px', fontWeight: 300, color: 'rgba(255,255,255,0.3)' }}>(optional)</span>
            </label>
            <input
              type="text"
              value={jobRole}
              onChange={e => setJobRole(e.target.value)}
              placeholder="e.g. Frontend Developer, Data Scientist, Marketing Manager"
              className="page-input"
            />
          </div>

          {error && (
            <div className="error-banner">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {error}
            </div>
          )}

          <button onClick={handleOptimize} disabled={loading || !summary.trim()} className="btn-primary">
            {loading ? 'Rewriting...' : 'Optimize Profile'}
          </button>
        </div>

        {loading && <LoadingSpinner message="Rewriting your summary..." />}

        {results && !loading && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em', color: '#FFD84D', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Output</span>
              <div style={{ height: '1px', flex: 1, background: 'linear-gradient(90deg, rgba(255,216,77,0.4), transparent)' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '16px' }}>
              {/* Original */}
              <div className="glass-card" style={{ overflow: 'hidden', padding: 0 }}>
                <div style={{ padding: '12px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600 }}>Original</span>
                </div>
                <div style={{ padding: '20px' }}>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, fontWeight: 300, whiteSpace: 'pre-wrap' }}>{summary}</p>
                </div>
              </div>

              {/* Optimized */}
              <div style={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(255,216,77,0.2)', background: 'rgba(255,216,77,0.03)' }}>
                <div style={{ padding: '12px 20px', borderBottom: '1px solid rgba(255,216,77,0.12)', background: 'rgba(255,216,77,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', color: '#FFD84D', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600 }}>AI Optimized</span>
                  <button onClick={handleCopy} className="copy-btn">
                    {copied ? '✓ Copied' : 'Copy'}
                  </button>
                </div>
                <div style={{ padding: '20px' }}>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.8, fontWeight: 300, whiteSpace: 'pre-wrap' }}>{results.optimized}</p>
                </div>
              </div>
            </div>

            {results.improvements_made?.length > 0 && (
              <div className="glass-card" style={{ padding: '24px', marginBottom: '20px', borderColor: 'rgba(255,216,77,0.12)' }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#FFD84D', letterSpacing: '0.14em', textTransform: 'uppercase', display: 'block', marginBottom: '16px', fontWeight: 600 }}>
                  Improvements Applied
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {results.improvements_made.map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#FFD84D', flexShrink: 0, marginTop: '9px', opacity: 0.6 }} />
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, fontWeight: 300 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => { setResults(null); setSummary(''); setJobRole('') }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,216,77,0.5)', fontFamily: 'Inter, sans-serif', fontSize: '12px', letterSpacing: '0.1em', textDecoration: 'underline', textUnderlineOffset: '3px' }}
            >
              Start over
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default LinkedInOptimizer