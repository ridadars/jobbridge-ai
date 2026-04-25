import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

// ─── Data ────────────────────────────────────────────────────────────────────

const features = [
  {
    path: '/cv',
    tag: '01',
    title: 'CV Scanner',
    description: 'Upload your CV for deep AI analysis — strengths mapped, gaps flagged, improvements prioritized.',
    cta: 'Scan CV',
  },
  {
    path: '/interview',
    tag: '02',
    title: 'AI Interview',
    description: 'Role-specific interview simulation with real-time AI scoring and actionable feedback on each answer.',
    cta: 'Start Session',
  },
  {
    path: '/linkedin',
    tag: '03',
    title: 'Profile Boost',
    description: 'Transform your LinkedIn summary into a keyword-optimized, recruiter-magnetizing professional narrative.',
    cta: 'Boost Profile',
  },
  {
    path: '/skills-gap',
    tag: '04',
    title: 'Skills Radar',
    description: 'Precision gap analysis between your current stack and the role requirements.',
    cta: 'Run Analysis',
  },
  {
    path: '/roadmap',
    tag: '05',
    title: 'Career Path',
    description: 'Personalized week-by-week roadmap engineered for your target role.',
    cta: 'Build Roadmap',
  },
]

const steps = [
  {
    num: '01',
    title: 'Upload Your CV',
    desc: 'Drop your PDF and let AI dissect every line — strengths, gaps, and quick wins surfaced instantly.',
  },
  {
    num: '02',
    title: 'Train With AI Interviews',
    desc: 'Practice role-specific questions, get scored answers, and build real confidence before the real thing.',
  },
  {
    num: '03',
    title: 'Land The Job',
    desc: 'Walk in optimized: polished LinkedIn, closed skills gap, and a personalized career roadmap in hand.',
  },
]

const testimonials = [
  {
    quote: "JobBridge showed me exactly what was missing from my CV. Got my first interview within a week of fixing it.",
    name: "Aisha K.",
    role: "CS Graduate, FAST",
  },
  {
    quote: "The mock interview module is insane. It caught filler words and weak answers I had no idea I was giving.",
    name: "Bilal R.",
    role: "Software Engineer Applicant",
  },
  {
    quote: "My LinkedIn rewrites got me 3x more profile views in two weeks. Recruiters started reaching out to me.",
    name: "Sara M.",
    role: "Marketing Graduate",
  },
  {
    quote: "The skills gap tool told me exactly what to learn for data science. Saved me months of guessing.",
    name: "Omar T.",
    role: "Data Analyst Trainee",
  },
  {
    quote: "I went from zero callbacks to two offers. JobBridge gave me the edge no one tells you about.",
    name: "Hina F.",
    role: "Business Graduate",
  },
]

const faqs = [
  {
    q: "Is JobBridge AI free to use?",
    a: "Yes — all five modules are completely free. No credit card, no paywalls.",
  },
  {
    q: "What kind of CV should I upload?",
    a: "Any text-based PDF works. Scanned image PDFs won't extract properly — export your CV directly from Word or Google Docs.",
  },
  {
    q: "How does the mock interview scoring work?",
    a: "AI evaluates each answer on clarity, relevance, and depth — giving you a Good / Average / Needs Improvement rating plus specific coaching notes.",
  },
  {
    q: "Can I use this for any job role?",
    a: "Absolutely. Just type your target role and every module — interview, skills gap, roadmap — adapts to that specific position.",
  },
  {
    q: "How is this different from ChatGPT?",
    a: "JobBridge is purpose-built for job seekers. Every prompt, flow, and output is engineered for career outcomes — not general conversation.",
  },
]

const showcaseModules = [
  {
    tag: 'CV SCANNER',
    title: 'Your CV, X-Rayed by AI',
    bullets: [
      'Instant strengths & weaknesses breakdown',
      'Missing skills flagged with priority ranking',
      'Actionable rewrite suggestions per section',
      'ATS-readiness score and keyword gaps',
    ],
    path: '/cv',
    cta: 'Scan My CV',
    mockup: <CVMockup />,
    flip: false,
  },
  {
    tag: 'AI INTERVIEW',
    title: 'Practice Until You\'re Unbeatable',
    bullets: [
      '4 AI-generated role-specific questions',
      'Real-time scoring on every answer',
      'Feedback on clarity, depth & structure',
      'End-of-session performance summary',
    ],
    path: '/interview',
    cta: 'Start Practicing',
    mockup: <InterviewMockup />,
    flip: true,
  },
  {
    tag: 'SKILLS RADAR',
    title: 'Know Exactly What You\'re Missing',
    bullets: [
      'Side-by-side have vs. need comparison',
      'Role-tailored skills map',
      'Priority learning recommendations',
      'Closes the gap between you and hired',
    ],
    path: '/skills-gap',
    cta: 'Run Gap Analysis',
    mockup: <SkillsMockup />,
    flip: false,
  },
]

// ─── Mockup Components ────────────────────────────────────────────────────────

function CVMockup() {
  return (
    <div style={m.card}>
      <div style={m.cardHeader}>
        <div style={m.dot('#4ade80')} />
        <div style={m.dot('#facc15')} />
        <div style={m.dot('#f87171')} />
        <span style={m.cardTitle}>CV Analysis Report</span>
      </div>
      <div style={m.section}>
        <div style={m.label('#4ade80')}>✓ STRENGTHS</div>
        {['Strong Python proficiency', 'Leadership experience cited', 'Quantified achievements'].map(t => (
          <div key={t} style={m.row('#4ade80')}>{t}</div>
        ))}
      </div>
      <div style={m.section}>
        <div style={m.label('#f87171')}>✗ MISSING SKILLS</div>
        {['SQL / Data querying', 'Cloud certifications', 'Agile methodology'].map(t => (
          <div key={t} style={m.row('#f87171')}>{t}</div>
        ))}
      </div>
      <div style={m.section}>
        <div style={m.label('#FFD84D')}>→ TOP SUGGESTION</div>
        <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
          Add metrics to your internship bullet points — numbers increase callback rate by 40%.
        </div>
      </div>
    </div>
  )
}

function InterviewMockup() {
  return (
    <div style={m.card}>
      <div style={m.cardHeader}>
        <div style={m.dot('#4ade80')} />
        <div style={m.dot('#facc15')} />
        <div style={m.dot('#f87171')} />
        <span style={m.cardTitle}>Mock Interview — Software Engineer</span>
      </div>
      <div style={{ ...m.section, borderLeft: '2px solid #FFD84D', paddingLeft: '14px' }}>
        <div style={{ fontSize: '12px', color: '#FFD84D', marginBottom: '8px', letterSpacing: '0.1em' }}>QUESTION 2 OF 4</div>
        <div style={{ fontSize: '14px', color: '#fff', lineHeight: 1.6 }}>
          Describe a time you handled a tight deadline. What was your approach?
        </div>
      </div>
      <div style={m.section}>
        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '8px' }}>YOUR ANSWER</div>
        <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, fontStyle: 'italic' }}>
          "I prioritised tasks using a sprint board, cut scope by 20% after stakeholder sign-off, and shipped on time..."
        </div>
      </div>
      <div style={{ ...m.section, background: 'rgba(74,222,128,0.08)', borderRadius: '10px', padding: '12px' }}>
        <div style={{ fontSize: '12px', color: '#4ade80', fontWeight: 700, marginBottom: '6px' }}>✓ GOOD — Score: 8.5/10</div>
        <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
          Strong STAR structure. Add the business impact of shipping on time to make it elite.
        </div>
      </div>
    </div>
  )
}

function SkillsMockup() {
  const have = ['Python', 'Excel', 'Communication', 'Tableau']
  const need = ['SQL', 'Machine Learning', 'R / Statistics', 'Power BI']
  return (
    <div style={m.card}>
      <div style={m.cardHeader}>
        <div style={m.dot('#4ade80')} />
        <div style={m.dot('#facc15')} />
        <div style={m.dot('#f87171')} />
        <span style={m.cardTitle}>Skills Gap — Data Analyst</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          <div style={m.label('#4ade80')}>YOU HAVE</div>
          {have.map(s => (
            <div key={s} style={{ ...m.pill, background: 'rgba(74,222,128,0.12)', color: '#4ade80', borderColor: 'rgba(74,222,128,0.3)' }}>✓ {s}</div>
          ))}
        </div>
        <div>
          <div style={m.label('#f87171')}>YOU NEED</div>
          {need.map(s => (
            <div key={s} style={{ ...m.pill, background: 'rgba(248,113,113,0.10)', color: '#f87171', borderColor: 'rgba(248,113,113,0.3)' }}>✗ {s}</div>
          ))}
        </div>
      </div>
      <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(255,216,77,0.06)', borderRadius: '10px', borderLeft: '2px solid #FFD84D' }}>
        <div style={{ fontSize: '12px', color: '#FFD84D', fontWeight: 700, marginBottom: '4px' }}>TOP PRIORITY</div>
        <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)' }}>Learn SQL first — it appears in 87% of Data Analyst job listings.</div>
      </div>
    </div>
  )
}

const m = {
  card: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '20px',
    padding: '24px',
    backdropFilter: 'blur(20px)',
    width: '100%',
    maxWidth: '440px',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '20px',
  },
  cardTitle: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.5)',
    marginLeft: '6px',
    fontFamily: 'Inter, sans-serif',
  },
  dot: (color) => ({
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    background: color,
    opacity: 0.7,
  }),
  section: {
    marginBottom: '16px',
  },
  label: (color) => ({
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.15em',
    color,
    marginBottom: '10px',
    fontFamily: 'Inter, sans-serif',
  }),
  row: (color) => ({
    fontSize: '13px',
    color: 'rgba(255,255,255,0.75)',
    padding: '6px 0',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    fontFamily: 'Inter, sans-serif',
  }),
  pill: {
    display: 'inline-block',
    padding: '5px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 600,
    border: '1px solid',
    marginBottom: '8px',
    width: '100%',
    fontFamily: 'Inter, sans-serif',
  },
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const [testimonialIdx, setTestimonialIdx] = useState(0)
  const canvasRef = useRef(null)

  useEffect(() => { setMounted(true) }, [])

  // Auto-advance testimonials
  useEffect(() => {
    const t = setInterval(() => setTestimonialIdx(i => (i + 1) % testimonials.length), 4000)
    return () => clearInterval(t)
  }, [])

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf, t = 0

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)

    const dots = Array.from({ length: 60 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.8 + 0.4,
      speed: Math.random() * 0.00012 + 0.00003,
      phase: Math.random() * Math.PI * 2,
    }))

    const draw = () => {
      t++
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      dots.forEach(d => {
        const x = ((d.x + d.speed * t) % 1) * canvas.width
        const y = d.y * canvas.height
        const alpha = 0.12 + 0.08 * Math.sin(t * 0.01 + d.phase)
        ctx.beginPath()
        ctx.arc(x, y, d.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(80,160,255,${alpha})`
        ctx.fill()
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <div style={s.root}>
      <style>{css}</style>
      <canvas ref={canvasRef} style={s.canvas} />
      <div style={s.glow1} />
      <div style={s.glow2} />

      <div style={s.inner}>

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section style={{ ...s.hero, opacity: mounted ? 1 : 0 }}>
          <div style={s.chapter}>CHAPTER 01: WELCOME</div>
          <h1 style={s.h1}>
            Land Your <span style={s.h1Accent}>Dream Job</span><br />
            With Precision
          </h1>
          <p style={s.heroSub}>
            Five intelligent AI-powered modules engineered to transform graduates
            into hired professionals with elite career intelligence.
          </p>
          <div style={s.ctaRow}>
            <Link to="/cv" style={{ textDecoration: 'none' }}>
              <button className="btn-primary">Launch CV Scan</button>
            </Link>
            <Link to="/interview" style={{ textDecoration: 'none' }}>
              <button className="btn-ghost">Practice Interview</button>
            </Link>
          </div>
        </section>

        {/* ── HOW IT WORKS ─────────────────────────────────────────────── */}
        <section style={s.section}>
          <div style={s.sectionHead}>
            <span style={s.sectionTag}>HOW IT WORKS</span>
            <div style={s.sectionLine} />
          </div>
          <h2 style={s.h2}>From Graduate to <span style={s.accent}>Job-Ready</span> in 3 Steps</h2>
          <div style={s.stepsGrid}>
            {steps.map((step, i) => (
              <div key={step.num} style={s.stepCard} className="step-card">
                <div style={s.stepNum}>{step.num}</div>
                {i < steps.length - 1 && <div style={s.stepArrow}>→</div>}
                <h3 style={s.stepTitle}>{step.title}</h3>
                <p style={s.stepDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FEATURE SHOWCASES ─────────────────────────────────────────── */}
        <section style={s.section}>
          <div style={s.sectionHead}>
            <span style={s.sectionTag}>AI MODULES</span>
            <div style={s.sectionLine} />
          </div>
          <h2 style={s.h2}>Everything You Need to <span style={s.accent}>Get Hired</span></h2>

          {showcaseModules.map((mod) => (
            <div
              key={mod.tag}
              style={{
                ...s.showcaseRow,
                flexDirection: mod.flip ? 'row-reverse' : 'row',
              }}
              className="showcase-row"
            >
              {/* Text side */}
              <div style={s.showcaseText}>
                <div style={s.chapter}>{mod.tag}</div>
                <h3 style={s.showcaseTitle}>{mod.title}</h3>
                <ul style={s.bulletList}>
                  {mod.bullets.map(b => (
                    <li key={b} style={s.bullet}>
                      <span style={s.bulletDot}>→</span> {b}
                    </li>
                  ))}
                </ul>
                <Link to={mod.path} style={{ textDecoration: 'none' }}>
                  <button className="btn-primary" style={{ marginTop: '28px' }}>{mod.cta}</button>
                </Link>
              </div>

              {/* Mockup side */}
              <div style={s.showcaseMockup}>
                {mod.mockup}
              </div>
            </div>
          ))}
        </section>

        {/* ── ALL MODULES GRID ──────────────────────────────────────────── */}
        <section style={s.section}>
          <div style={s.sectionHead}>
            <span style={s.sectionTag}>ALL TOOLS</span>
            <div style={s.sectionLine} />
          </div>
          <h2 style={s.h2}>Your Complete <span style={s.accent}>Career Arsenal</span></h2>
          <div style={s.grid}>
            {features.map((f) => (
              <Link key={f.path} to={f.path} style={{ textDecoration: 'none' }}>
                <div className="feature-card">
                  <div style={s.cardTag}>{f.tag}</div>
                  <h3 style={s.cardTitle}>{f.title}</h3>
                  <p style={s.cardDesc}>{f.description}</p>
                  <div style={s.cardCta}>{f.cta} →</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── TESTIMONIALS ──────────────────────────────────────────────── */}
        <section style={s.section}>
          <div style={s.sectionHead}>
            <span style={s.sectionTag}>TESTIMONIALS</span>
            <div style={s.sectionLine} />
          </div>
          <h2 style={s.h2}>What <span style={s.accent}>Graduates</span> Are Saying</h2>

          <div style={s.testimonialWrapper}>
            {testimonials.map((t, i) => (
              <div
                key={i}
                style={{
                  ...s.testimonialCard,
                  opacity: i === testimonialIdx ? 1 : 0,
                  transform: i === testimonialIdx ? 'translateY(0)' : 'translateY(20px)',
                  pointerEvents: i === testimonialIdx ? 'auto' : 'none',
                  position: i === 0 ? 'relative' : 'absolute',
                  top: 0, left: 0, right: 0,
                }}
              >
                <div style={s.quoteIcon}>"</div>
                <p style={s.quoteText}>{t.quote}</p>
                <div style={s.quoteName}>{t.name}</div>
                <div style={s.quoteRole}>{t.role}</div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div style={s.dotRow}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setTestimonialIdx(i)}
                style={{
                  ...s.testimonialDot,
                  background: i === testimonialIdx ? '#FFD84D' : 'rgba(255,255,255,0.2)',
                  transform: i === testimonialIdx ? 'scale(1.3)' : 'scale(1)',
                }}
              />
            ))}
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────────── */}
        <section style={s.section}>
          <div style={s.sectionHead}>
            <span style={s.sectionTag}>FAQ</span>
            <div style={s.sectionLine} />
          </div>
          <h2 style={s.h2}>Frequently Asked <span style={s.accent}>Questions</span></h2>

          <div style={s.faqList}>
            {faqs.map((faq, i) => (
              <div
                key={i}
                style={s.faqItem}
                className="faq-item"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div style={s.faqQ}>
                  <span>{faq.q}</span>
                  <span style={{ ...s.faqChevron, transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0deg)' }}>+</span>
                </div>
                {openFaq === i && (
                  <div style={s.faqA}>{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── FINAL CTA ─────────────────────────────────────────────────── */}
        <section style={s.finalCta}>
          <div style={s.finalGlow} />
          <div style={s.chapter}>READY TO START?</div>
          <h2 style={{ ...s.h2, fontSize: 'clamp(36px, 5vw, 64px)', marginBottom: '20px' }}>
            Beat the Hiring System<br /><span style={s.accent}>Starting Today</span>
          </h2>
          <p style={{ ...s.heroSub, marginBottom: '36px' }}>
            Join thousands of graduates using AI to get more interviews, better offers, and faster careers.
          </p>
          <div style={s.ctaRow}>
            <Link to="/cv" style={{ textDecoration: 'none' }}>
              <button className="btn-primary" style={{ padding: '16px 36px', fontSize: '16px' }}>Get Started Free</button>
            </Link>
            <Link to="/interview" style={{ textDecoration: 'none' }}>
              <button className="btn-ghost" style={{ padding: '16px 36px', fontSize: '16px' }}>Practice Interview</button>
            </Link>
          </div>
          <div style={s.finalBadges}>
            <span style={s.badge}>✓ No sign-up needed</span>
            <span style={s.badge}>✓ 100% free</span>
            <span style={s.badge}>✓ Powered by Llama 3 70B</span>
          </div>
        </section>

      </div>
    </div>
  )
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const s = {
  root: {
    minHeight: '100vh',
    position: 'relative',
    overflowX: 'hidden',
    background: `
      radial-gradient(circle at 75% 20%, rgba(59,130,246,0.25), transparent 30%),
      radial-gradient(circle at 35% 40%, rgba(29,78,216,0.18), transparent 35%),
      linear-gradient(135deg, #020617 0%, #081225 45%, #0B1D3A 100%)
    `,
  },
  canvas: {
    position: 'fixed', inset: 0, width: '100%', height: '100%',
    pointerEvents: 'none', zIndex: 0,
  },
  glow1: {
    position: 'absolute', top: '12%', right: '-180px',
    width: '420px', height: '420px', borderRadius: '50%',
    background: 'rgba(37,99,235,0.22)', filter: 'blur(120px)', zIndex: 0,
  },
  glow2: {
    position: 'absolute', bottom: '10%', left: '-120px',
    width: '320px', height: '320px', borderRadius: '50%',
    background: 'rgba(96,165,250,0.10)', filter: 'blur(100px)', zIndex: 0,
  },
  inner: {
    position: 'relative', zIndex: 1,
    maxWidth: '1280px', margin: '0 auto', padding: '0 40px',
  },

  // Hero
  hero: {
    paddingTop: '120px', paddingBottom: '90px',
    maxWidth: '900px', transition: 'opacity 0.7s ease',
  },
  chapter: {
    fontFamily: 'Inter, sans-serif', fontSize: '12px',
    letterSpacing: '0.25em', textTransform: 'uppercase',
    color: '#FFD84D', marginBottom: '28px', fontWeight: 600,
  },
  h1: {
    fontFamily: "'Playfair Display', serif", fontWeight: 700,
    fontSize: 'clamp(58px, 8vw, 110px)', lineHeight: 0.95,
    letterSpacing: '-0.04em', color: '#F8FAFC', marginBottom: '28px',
  },
  h1Accent: {
    fontStyle: 'italic',
    background: 'linear-gradient(90deg,#FFD84D,#FACC15,#FFF2A6)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
  },
  heroSub: {
    fontFamily: 'Inter, sans-serif', fontSize: '18px',
    lineHeight: 1.8, color: 'rgba(255,255,255,0.72)',
    maxWidth: '600px', marginBottom: '42px',
  },
  ctaRow: { display: 'flex', gap: '14px', flexWrap: 'wrap' },

  // Sections
  section: { paddingBottom: '100px' },
  sectionHead: {
    display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px',
  },
  sectionTag: {
    fontFamily: 'Inter, sans-serif', fontSize: '12px',
    fontWeight: 600, letterSpacing: '0.2em', color: '#FFD84D',
    whiteSpace: 'nowrap',
  },
  sectionLine: {
    flex: 1, height: '1px',
    background: 'linear-gradient(90deg, rgba(255,216,77,0.5), transparent)',
  },
  h2: {
    fontFamily: "'Playfair Display', serif", fontWeight: 700,
    fontSize: 'clamp(36px, 5vw, 56px)', color: '#F8FAFC',
    lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '50px',
  },
  accent: {
    fontStyle: 'italic',
    background: 'linear-gradient(90deg,#FFD84D,#FACC15)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
  },

  // Steps
  stepsGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '24px', position: 'relative',
  },
  stepCard: {
    padding: '36px 28px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '20px', position: 'relative',
    backdropFilter: 'blur(18px)',
  },
  stepNum: {
    fontFamily: "'Playfair Display', serif", fontWeight: 700,
    fontSize: '52px', color: '#FFD84D', opacity: 0.25,
    lineHeight: 1, marginBottom: '20px',
  },
  stepArrow: {
    position: 'absolute', top: '50%', right: '-18px',
    transform: 'translateY(-50%)',
    fontSize: '24px', color: '#FFD84D', opacity: 0.4, zIndex: 2,
  },
  stepTitle: {
    fontFamily: "'Playfair Display', serif", fontWeight: 600,
    fontSize: '22px', color: '#fff', marginBottom: '14px',
  },
  stepDesc: {
    fontFamily: 'Inter, sans-serif', fontSize: '15px',
    lineHeight: 1.7, color: 'rgba(255,255,255,0.6)',
  },

  // Showcase
  showcaseRow: {
    display: 'flex', alignItems: 'center',
    gap: '60px', marginBottom: '80px', flexWrap: 'wrap',
  },
  showcaseText: { flex: '1 1 380px', minWidth: '300px' },
  showcaseMockup: {
    flex: '1 1 420px', display: 'flex',
    justifyContent: 'center', minWidth: '300px',
  },
  showcaseTitle: {
    fontFamily: "'Playfair Display', serif", fontWeight: 700,
    fontSize: 'clamp(28px, 4vw, 40px)', color: '#fff',
    lineHeight: 1.2, marginBottom: '24px',
  },
  bulletList: { listStyle: 'none', padding: 0, margin: 0 },
  bullet: {
    fontFamily: 'Inter, sans-serif', fontSize: '15px',
    color: 'rgba(255,255,255,0.72)', lineHeight: 1.7,
    padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.06)',
    display: 'flex', gap: '10px',
  },
  bulletDot: { color: '#FFD84D', fontWeight: 700, flexShrink: 0 },

  // Grid
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '22px',
  },
  cardTag: {
    fontFamily: 'Inter, sans-serif', fontSize: '12px',
    fontWeight: 700, color: '#FFD84D', marginBottom: '18px', letterSpacing: '0.15em',
  },
  cardTitle: {
    fontFamily: "'Playfair Display', serif", fontWeight: 600,
    fontSize: '28px', color: '#fff', marginBottom: '14px',
  },
  cardDesc: {
    fontFamily: 'Inter, sans-serif', fontSize: '15px',
    lineHeight: 1.7, color: 'rgba(255,255,255,0.65)', marginBottom: '26px',
  },
  cardCta: {
    fontFamily: 'Inter, sans-serif', fontSize: '14px',
    fontWeight: 600, color: '#FFD84D',
  },

  // Testimonials
  testimonialWrapper: {
    position: 'relative', maxWidth: '760px',
    margin: '0 auto 32px', minHeight: '220px',
  },
  testimonialCard: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '24px', padding: '48px',
    textAlign: 'center', backdropFilter: 'blur(20px)',
    transition: 'opacity 0.5s ease, transform 0.5s ease',
  },
  quoteIcon: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '80px', color: '#FFD84D',
    lineHeight: 1, marginBottom: '16px', opacity: 0.6,
  },
  quoteText: {
    fontFamily: "'Playfair Display', serif",
    fontStyle: 'italic', fontSize: '20px',
    color: 'rgba(255,255,255,0.85)', lineHeight: 1.7,
    marginBottom: '28px',
  },
  quoteName: {
    fontFamily: 'Inter, sans-serif', fontWeight: 700,
    fontSize: '15px', color: '#FFD84D', marginBottom: '4px',
  },
  quoteRole: {
    fontFamily: 'Inter, sans-serif', fontSize: '13px',
    color: 'rgba(255,255,255,0.45)',
  },
  dotRow: {
    display: 'flex', justifyContent: 'center',
    gap: '10px', marginTop: '16px',
  },
  testimonialDot: {
    width: '8px', height: '8px', borderRadius: '50%',
    border: 'none', cursor: 'pointer',
    transition: 'all 0.3s ease', padding: 0,
  },

  // FAQ
  faqList: { maxWidth: '760px' },
  faqItem: {
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    padding: '22px 0', cursor: 'pointer',
  },
  faqQ: {
    fontFamily: 'Inter, sans-serif', fontSize: '16px',
    fontWeight: 600, color: '#fff',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    gap: '20px',
  },
  faqChevron: {
    fontSize: '24px', color: '#FFD84D',
    transition: 'transform 0.3s ease', flexShrink: 0,
    lineHeight: 1,
  },
  faqA: {
    fontFamily: 'Inter, sans-serif', fontSize: '15px',
    color: 'rgba(255,255,255,0.65)', lineHeight: 1.7,
    paddingTop: '14px',
  },

  // Final CTA
  finalCta: {
    position: 'relative', paddingBottom: '120px',
    paddingTop: '60px', textAlign: 'center',
  },
  finalGlow: {
    position: 'absolute', top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '600px', height: '400px', borderRadius: '50%',
    background: 'rgba(37,99,235,0.15)', filter: 'blur(100px)', zIndex: 0,
    pointerEvents: 'none',
  },
  finalBadges: {
    display: 'flex', justifyContent: 'center',
    gap: '24px', marginTop: '24px', flexWrap: 'wrap',
  },
  badge: {
    fontFamily: 'Inter, sans-serif', fontSize: '13px',
    color: 'rgba(255,255,255,0.45)', letterSpacing: '0.05em',
  },
}

// ─── CSS ─────────────────────────────────────────────────────────────────────

const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600;1,700&family=Inter:wght@400;500;600;700&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

.btn-primary {
  padding: 14px 30px;
  border: none; border-radius: 10px;
  background: #FFD84D; color: #111827;
  font-family: Inter, sans-serif; font-weight: 700; font-size: 14px;
  cursor: pointer; transition: 0.25s ease;
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(250,204,21,0.25);
}

.btn-ghost {
  padding: 14px 30px; border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.16);
  background: rgba(255,255,255,0.03); color: white;
  font-family: Inter, sans-serif; font-weight: 600;
  cursor: pointer; transition: 0.25s ease;
}
.btn-ghost:hover { background: rgba(255,255,255,0.08); }

.feature-card {
  padding: 30px; border-radius: 20px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  backdrop-filter: blur(18px);
  transition: 0.3s ease; min-height: 260px;
}
.feature-card:hover {
  transform: translateY(-6px);
  border-color: rgba(255,216,77,0.28);
  background: rgba(255,255,255,0.06);
}

.step-card:hover {
  border-color: rgba(255,216,77,0.2);
  transform: translateY(-4px);
  transition: 0.3s ease;
}

.faq-item:hover { background: rgba(255,255,255,0.02); border-radius: 12px; padding: 22px 12px; margin: 0 -12px; }

.showcase-row { transition: opacity 0.4s ease; }

@media (max-width: 900px) {
  .showcase-row { flex-direction: column !important; }
}

@media (max-width: 768px) {

  .steps-grid { grid-template-columns: 1fr !important; }
}
`