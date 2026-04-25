const spinCss = `
@keyframes home-spin-cw  { to { transform: rotate(360deg);  } }
@keyframes home-spin-ccw { to { transform: rotate(-360deg); } }
@keyframes home-pulse    { 0%,100% { opacity: 0.4; } 50% { opacity: 1; } }
.hs-ring-outer { animation: home-spin-cw  1.1s linear infinite; }
.hs-ring-inner { animation: home-spin-ccw 0.75s linear infinite; }
.hs-dot        { animation: home-pulse 1.5s ease-in-out infinite; }
`

function LoadingSpinner({ message = 'Processing...' }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '64px 24px',
      gap: '24px',
    }}>
      <style>{spinCss}</style>

      {/* Orbital rings */}
      <div style={{ position: 'relative', width: '54px', height: '54px' }}>
        {/* Outer ring */}
        <div className="hs-ring-outer" style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          border: '1.5px solid rgba(255,216,77,0.1)',
          borderTopColor: '#FFD84D',
        }} />
        {/* Inner ring */}
        <div className="hs-ring-inner" style={{
          position: 'absolute',
          inset: '10px',
          borderRadius: '50%',
          border: '1.5px solid rgba(255,216,77,0.06)',
          borderBottomColor: 'rgba(255,216,77,0.5)',
        }} />
        {/* Center dot */}
        <div className="hs-dot" style={{
          position: 'absolute',
          inset: '22px',
          borderRadius: '50%',
          background: '#FFD84D',
          boxShadow: '0 0 10px rgba(255,216,77,0.5)',
        }} />
      </div>

      <div style={{ textAlign: 'center' }}>
        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '17px',
          fontWeight: 600,
          color: '#F8FAFC',
          marginBottom: '6px',
          letterSpacing: '-0.01em',
          fontStyle: 'italic',
        }}>
          {message}
        </p>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '11px',
          color: 'rgba(255,255,255,0.25)',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          fontWeight: 500,
        }}>
          10 – 20 seconds
        </p>
      </div>
    </div>
  )
}

export default LoadingSpinner