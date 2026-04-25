import { useState } from 'react'

function ResultCard({ title, content }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(content || '').then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  function renderContent(text) {
    if (!text) return (
      <p style={{ color: 'rgba(255,255,255,0.2)', fontStyle: 'italic', fontSize: '13px', fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
        No data returned
      </p>
    )

    return text.split('\n').map((line, i) => {
      const trimmed = line.trim()
      if (!trimmed) return <div key={i} style={{ height: '6px' }} />

      if (trimmed.startsWith('-') || trimmed.startsWith('•') || trimmed.startsWith('*')) {
        return (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '8px' }}>
            <div style={{
              width: '3px', height: '3px', borderRadius: '50%',
              background: '#FFD84D', flexShrink: 0, marginTop: '9px', opacity: 0.7,
            }} />
            <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '13px', lineHeight: 1.75, fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
              {trimmed.replace(/^[-•*]\s*/, '')}
            </span>
          </div>
        )
      }

      return (
        <p key={i} style={{ color: 'rgba(255,255,255,0.65)', fontSize: '13px', lineHeight: 1.75, marginBottom: '8px', fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
          {trimmed}
        </p>
      )
    })
  }

  return (
    <div style={{
      borderRadius: '16px',
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.08)',
      overflow: 'hidden',
      transition: '0.3s ease',
    }}>
      {/* Header */}
      <div style={{
        background: 'rgba(255,216,77,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <h3 style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '11px',
          fontWeight: 600,
          color: '#FFD84D',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
        }}>
          {title}
        </h3>

        <button
          onClick={handleCopy}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            background: 'none',
            border: '1px solid rgba(255,216,77,0.2)',
            borderRadius: '6px',
            padding: '4px 10px',
            cursor: 'pointer',
            color: copied ? '#FFD84D' : 'rgba(255,216,77,0.5)',
            fontFamily: 'Inter, sans-serif',
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            transition: 'all 0.2s',
          }}
        >
          {copied ? (
            <>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
              Copied
            </>
          ) : (
            <>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              Copy
            </>
          )}
        </button>
      </div>

      {/* Content */}
      <div style={{ padding: '20px' }}>
        {renderContent(content)}
      </div>
    </div>
  )
}

export default ResultCard