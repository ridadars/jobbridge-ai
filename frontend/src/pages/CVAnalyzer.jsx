import { useState } from 'react'
import FileUpload from '../components/FileUpload'
import ResultCard from '../components/ResultCard'
import LoadingSpinner from '../components/LoadingSpinner'
import { analyzeCv } from '../api/client'

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
  margin-top: 16px;
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

function ErrorBanner({ message }) {
  if (!message) return null
  return (
    <div className="error-banner">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0, marginTop: '1px' }}>
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      {message}
    </div>
  )
}

function CVAnalyzer() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError] = useState('')

  function handleFileSelect(file) {
    setSelectedFile(file)
    setError('')
    setResults(null)
  }

  async function handleAnalyze() {
    if (!selectedFile) { setError('Please upload a PDF file first.'); return }
    setLoading(true); setError(''); setResults(null)
    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      const data = await analyzeCv(formData)
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
            MODULE 01
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(255,216,77,0.08)', border: '1px solid rgba(255,216,77,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFD84D', flexShrink: 0 }}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1, letterSpacing: '-0.03em', color: '#F8FAFC' }}>
              CV Scanner
            </h1>
          </div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', lineHeight: 1.8, color: 'rgba(255,255,255,0.6)', maxWidth: '560px', fontWeight: 300 }}>
            Upload your CV as a PDF. The AI engine will map strengths, surface weaknesses, identify missing skills, and generate concrete improvement directives.
          </p>
        </div>

        {/* Input card */}
        <div className="glass-card" style={{ padding: '32px', marginBottom: '20px' }}>
          <label className="page-label">Upload Document</label>
          <FileUpload onFileSelect={handleFileSelect} accept=".pdf" />
          <ErrorBanner message={error} />
          <button
            onClick={handleAnalyze}
            disabled={loading || !selectedFile}
            className="btn-primary"
            style={{ marginTop: '20px' }}
          >
            {loading ? 'Analyzing...' : 'Run CV Analysis'}
          </button>
        </div>

        {loading && <LoadingSpinner message="AI is scanning your CV..." />}

        {results && !loading && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '8px 0 4px' }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em', color: '#FFD84D', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                Analysis Output
              </span>
              <div style={{ height: '1px', flex: 1, background: 'linear-gradient(90deg, rgba(255,216,77,0.4), transparent)' }} />
            </div>
            <ResultCard title="Strengths Detected"      content={results.strengths}            />
            <ResultCard title="Weak Points"             content={results.weak_points}          />
            <ResultCard title="Missing Skills"          content={results.missing_skills}       />
            <ResultCard title="Improvement Directives"  content={results.improved_suggestions} />
          </div>
        )}
      </div>
    </div>
  )
}

export default CVAnalyzer