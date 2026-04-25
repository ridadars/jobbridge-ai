import { useState } from 'react'
import { Link } from 'react-router-dom'

const chapters = [
  {
    number: '01',
    label: 'Welcome',
    path: '/',
    desc: 'Start your AI-powered career journey.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
  },
  {
    number: '02',
    label: 'CV Scanner',
    path: '/cv',
    desc: 'Upload your CV and get AI-powered analysis with recruiter-focused feedback.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
  },
  {
    number: '03',
    label: 'AI Interview',
    path: '/interview',
    desc: 'Practice real interview scenarios with instant AI scoring and guidance.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978',
  },
  {
    number: '04',
    label: 'Profile Boost',
    path: '/linkedin',
    desc: 'Optimize your LinkedIn summary and branding for recruiters.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
  },
  {
    number: '05',
    label: 'Skills Radar',
    path: '/skills-gap',
    desc: 'Discover the exact skill gaps between you and your target role.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d',
  },
  {
    number: '06',
    label: 'Career Path',
    path: '/roadmap',
    desc: 'Generate a personalized roadmap to achieve your dream career.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
  },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)

  return (
    <>
      <nav style={styles.navbar}>
        <Link to="/" style={styles.logo}>
          JobBridgeAI
        </Link>

        <button style={styles.menuBtn} onClick={() => setOpen(true)}>
          ☰
        </button>
      </nav>

      {/* BACKDROP */}
      <div
        style={{
          ...styles.overlay,
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
        }}
        onClick={() => setOpen(false)}
      />

      {/* PANEL */}
      <div
        style={{
          ...styles.panel,
          transform: open ? 'translateX(0)' : 'translateX(100%)',
        }}
      >
        {/* LEFT SIDE */}
        <div style={styles.left}>
          <div style={styles.chapterHeader}>
            <span>CHAPTERS</span>
            <div style={styles.line} />
          </div>

          <div style={styles.chapterContent}>
            <img
              src={chapters[active].image}
              alt={chapters[active].label}
              style={styles.previewImage}
            />

            <div style={styles.chapterLinks}>
              {chapters.map((chapter, i) => (
                <Link
                  key={chapter.label}
                  to={chapter.path}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setOpen(false)}
                  style={{
                    ...styles.chapterLink,
                    color: active === i ? '#2563EB' : '#020617',
                    fontStyle: active === i ? 'italic' : 'normal',
                  }}
                >
                  <span style={styles.chapterNumber}>{chapter.number}</span>
                  {chapter.label}
                </Link>
              ))}
            </div>

            <p style={styles.description}>
              {chapters[active].desc}
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div style={styles.right}>
          <button style={styles.closeBtn} onClick={() => setOpen(false)}>
            —
          </button>

          {/* Brand Block */}
          <div style={styles.brandBlock}>
            <div style={styles.brandLogo}>JobBridgeAI</div>
            <p style={styles.brandTagline}>
              From graduate to hired — five AI modules engineered for your career breakthrough.
            </p>
            <div style={styles.brandStats}>
              {[
                { num: '5', label: 'AI Modules' },
                { num: '100%', label: 'Free' },
                { num: 'LLM', label: 'Powered' },
              ].map(stat => (
                <div key={stat.label} style={styles.brandStat}>
                  <div style={styles.brandStatNum}>{stat.num}</div>
                  <div style={styles.brandStatLabel}>{stat.label}</div>
                </div>
              ))}
            </div>
            <div style={styles.brandDivider} />
          </div>

          <h3 style={styles.rightTitle}>DISCOVER</h3>

          <div style={styles.rightLinks}>
            {chapters.map((chapter) => (
              <Link
                key={chapter.label}
                to={chapter.path}
                onClick={() => setOpen(false)}
                style={styles.sideLink}
              >
                {chapter.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600&display=swap');
      `}</style>
    </>
  )
}

const styles = {
  navbar: {
    padding: '22px 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'rgba(2,6,23,0.85)',
    backdropFilter: 'blur(15px)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },

  logo: {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 700,
    fontSize: '20px',
    fontFamily: 'Inter, sans-serif',
  },

  menuBtn: {
    width: '54px',
    height: '54px',
    borderRadius: '16px',
    border: '1px solid rgba(255,255,255,0.12)',
    background: '#fff',
    fontSize: '20px',
    cursor: 'pointer',
  },

  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.35)',
    transition: '0.35s ease',
    zIndex: 100,
  },

  panel: {
    position: 'fixed',
    inset: 0,
    display: 'grid',
    gridTemplateColumns: '1fr 390px',
    background: '#F8F7F1',
    zIndex: 200,
    transition: 'transform .6s cubic-bezier(.22,1,.36,1)',
  },

  left: {
    padding: '60px',
  },

  chapterHeader: {
    display: 'flex',
    gap: '18px',
    alignItems: 'center',
    marginBottom: '40px',
    color: '#64748B',
    fontSize: '12px',
    letterSpacing: '0.2em',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 600,
  },

  line: {
    flex: 1,
    height: '1px',
    background: '#CBD5E1',
  },

  chapterContent: {
    display: 'grid',
    gridTemplateColumns: '240px 1fr 260px',
    gap: '34px',
    alignItems: 'start',
  },

  previewImage: {
    width: '100%',
    maxWidth: '240px',
    borderRadius: '18px',
    objectFit: 'cover',
    height: '180px',
  },

  chapterLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },

  chapterLink: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '46px',
    textDecoration: 'none',
    display: 'flex',
    gap: '18px',
    alignItems: 'baseline',
    transition: '.25s ease',
    lineHeight: 1.05,
  },

  chapterNumber: {
    fontSize: '13px',
    fontFamily: 'Inter, sans-serif',
    color: '#64748B',
    minWidth: '24px',
    marginRight: '8px',
  },

  description: {
    fontSize: '17px',
    color: '#64748B',
    lineHeight: 1.7,
    paddingTop: '10px',
    maxWidth: '260px',
    fontFamily: 'Inter, sans-serif',
  },

  right: {
    background: '#020617',
    padding: '40px',
    color: '#fff',
    position: 'relative',
  },

  closeBtn: {
    position: 'absolute',
    top: '24px',
    right: '24px',
    width: '56px',
    height: '56px',
    borderRadius: '16px',
    border: 'none',
    background: '#fff',
    fontSize: '28px',
    cursor: 'pointer',
  },

  brandBlock: {
    marginTop: '90px',
    marginBottom: '32px',
  },

  brandLogo: {
    fontFamily: "'Playfair Display', serif",
    fontWeight: 700,
    fontSize: '22px',
    color: '#FFD84D',
    marginBottom: '12px',
    letterSpacing: '-0.01em',
  },

  brandTagline: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '13px',
    color: 'rgba(255,255,255,0.5)',
    lineHeight: 1.7,
    marginBottom: '20px',
  },

  brandStats: {
    display: 'flex',
    gap: '20px',
    marginBottom: '28px',
  },

  brandStat: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
  },

  brandStatNum: {
    fontFamily: "'Playfair Display', serif",
    fontWeight: 700,
    fontSize: '20px',
    color: '#FFD84D',
  },

  brandStatLabel: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '10px',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.35)',
  },

  brandDivider: {
    height: '1px',
    background: 'rgba(255,255,255,0.08)',
    marginBottom: '28px',
  },

  rightTitle: {
    marginTop: '0px',
    marginBottom: '24px',
    textTransform: 'uppercase',
    letterSpacing: '.2em',
    fontSize: '12px',
    color: '#94A3B8',
    fontFamily: 'Inter, sans-serif',
  },

  rightLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },

  sideLink: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '20px',
    fontFamily: 'Inter, sans-serif',
    transition: '.2s',
  },
}