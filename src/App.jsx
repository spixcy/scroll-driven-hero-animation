import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const metrics = [
  { value: '58%', label: 'Faster first-action completion', tone: 'lime', at: 0.28 },
  { value: '23%', label: 'Lower support friction', tone: 'blue', at: 0.48 },
  { value: '27%', label: 'More repeat engagement', tone: 'violet', at: 0.68 },
  { value: '40%', label: 'Less time to discover value', tone: 'orange', at: 0.85 },
]

function Vehicle() {
  return (
    <svg
      className="vehicle-svg"
      viewBox="0 0 420 180"
      role="img"
      aria-label="Stylized futuristic car"
    >
      <defs>
        <linearGradient id="body" x1="0" x2="1">
          <stop offset="0%" stopColor="#dce7ff" />
          <stop offset="48%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#9fb3d8" />
        </linearGradient>
        <linearGradient id="glass" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#18243d" />
          <stop offset="100%" stopColor="#5e82bb" />
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="12" stdDeviation="12" floodOpacity="0.35" />
        </filter>
      </defs>

      <g filter="url(#shadow)">
        <path
          d="M57 112 C68 88, 102 75, 152 66 L191 42 C214 29, 255 24, 292 31 L343 52 C361 59, 377 71, 389 90 L402 111 L395 129 C386 139, 367 142, 344 142 H97 C77 142, 62 134, 57 121 Z"
          fill="url(#body)"
          stroke="#10192b"
          strokeWidth="5"
        />
        <path
          d="M164 66 L192 48 C214 36, 249 32, 279 37 L327 57 L344 70 H172 Z"
          fill="url(#glass)"
          stroke="#16233b"
          strokeWidth="4"
        />
        <path d="M209 48 L202 70" stroke="#92a9cd" strokeWidth="3" opacity="0.55" />
        <path d="M284 39 L294 70" stroke="#92a9cd" strokeWidth="3" opacity="0.4" />
        <path d="M84 97 H348" stroke="#7589ad" strokeWidth="3" opacity="0.4" />
        <path d="M66 113 H358" stroke="#f6fbff" strokeWidth="4" opacity="0.7" />
        <circle cx="121" cy="133" r="22" fill="#0b1221" />
        <circle cx="121" cy="133" r="10" fill="#6f7f9e" />
        <circle cx="323" cy="133" r="22" fill="#0b1221" />
        <circle cx="323" cy="133" r="10" fill="#6f7f9e" />
        <path d="M61 112 L45 118" stroke="#a6ff4d" strokeWidth="9" strokeLinecap="round" />
        <path d="M391 104 L407 98" stroke="#7fd8ff" strokeWidth="8" strokeLinecap="round" />
        <path d="M371 118 H395" stroke="#7fd8ff" strokeWidth="4" strokeLinecap="round" opacity="0.9" />
      </g>
    </svg>
  )
}

function MetricCard({ metric, index, refs }) {
  const toneClass = {
    lime: 'metric--lime',
    blue: 'metric--blue',
    violet: 'metric--violet',
    orange: 'metric--orange',
  }[metric.tone]

  return (
    <article
      ref={(node) => {
        refs.current[index] = node
      }}
      className={`metric ${toneClass}`}
      style={{ '--metric-at': metric.at }}
    >
      <span className="metric-index">0{index + 1}</span>
      <strong>{metric.value}</strong>
      <span>{metric.label}</span>
    </article>
  )
}

export default function App() {
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const vehicleRef = useRef(null)
  const trailRef = useRef(null)
  const headlineRef = useRef(null)
  const metricRefs = useRef([])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const letters = gsap.utils.toArray('.hero-letter')
      const stage = stageRef.current
      const vehicle = vehicleRef.current
      const trail = trailRef.current
      const section = sectionRef.current
      const headline = headlineRef.current

      gsap.fromTo(
        headline,
        { opacity: 0, y: 18, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.05, ease: 'power3.out', delay: 0.12 },
      )

      gsap.fromTo(
        letters,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.045, delay: 0.22, ease: 'power2.out' },
      )

      gsap.fromTo(
        metricRefs.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.14,
          delay: 0.45,
          ease: 'power3.out',
        },
      )

      const getTravel = () => {
        const viewportWidth = window.innerWidth
        const vehicleWidth = vehicle.offsetWidth
        return Math.max(0, viewportWidth - vehicleWidth - Math.min(120, viewportWidth * 0.06))
      }

      const scrollTimeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.85,
          pin: stage,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      scrollTimeline
        .to(vehicle, { x: () => getTravel(), duration: 1 }, 0)
        .to(trail, { scaleX: 1, duration: 1 }, 0)
        .to('.orb', { rotation: 360, duration: 1 }, 0)
        .to('.hero-copy', { yPercent: -18, duration: 0.48 }, 0)
        .to('.headline-wrap', { scale: 0.88, duration: 0.55 }, 0)

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress
          const width = stage.clientWidth
          const travel = getTravel()
          const x = travel * progress
          const center = x + vehicle.offsetWidth * 0.5

          gsap.set(trail, { width: `${Math.max(0, center)}px` })

          letters.forEach((letter, i) => {
            const ratio = (i + 1) / letters.length
            const threshold = width * (0.17 + ratio * 0.43)
            gsap.set(letter, {
              opacity: center > threshold ? 1 : 0.16,
              y: center > threshold ? 0 : 8,
            })
          })
        },
      })

      gsap.to('.scroll-hint', {
        opacity: 0,
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'top+=120 top',
          scrub: true,
        },
      })

      ScrollTrigger.refresh()
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <main className="site-shell">
      <section ref={sectionRef} className="hero-section">
        <div ref={stageRef} className="hero-stage">
          <div className="ambient-grid" />
          <div className="glow glow-a" />
          <div className="glow glow-b" />

          <header className="topbar">
            <div className="brand-mark">
              <span className="brand-dot" />
              <span>ITZFIZZ / MOTION LAB</span>
            </div>
            <span className="topbar-note">SCROLL TO DRIVE</span>
          </header>

          <div className="hero-copy">
            <div ref={headlineRef} className="headline-wrap">
              <p className="eyebrow">SCROLL-DRIVEN EXPERIENCE</p>
              <h1 aria-label="WELCOME ITZ FIZZ" className="headline">
                {['W', 'E', 'L', 'C', 'O', 'M', 'E'].map((letter, i) => (
                  <span key={`welcome-${i}`} className="hero-letter">
                    {letter}
                  </span>
                ))}
                <span className="hero-letter hero-space">&nbsp;</span>
                {['I', 'T', 'Z', 'F', 'I', 'Z', 'Z'].map((letter, i) => (
                  <span key={`itz-${i}`} className="hero-letter">
                    {letter}
                  </span>
                ))}
              </h1>
              <p className="subhead">
                Scroll, and the visual follows your movement. The road stays pinned while motion, metrics,
                and typography respond to progress.
              </p>
            </div>
          </div>

          <div className="stage-ruler" aria-hidden="true">
            <span>00</span>
            <span>25</span>
            <span>50</span>
            <span>75</span>
            <span>100</span>
          </div>

          <div className="metrics-grid" aria-label="Impact metrics">
            {metrics.map((metric, index) => (
              <MetricCard key={metric.value} metric={metric} index={index} refs={metricRefs} />
            ))}
          </div>

          <div className="runway-wrap">
            <div className="runway-label">SCROLL PROGRESS / LIVE</div>
            <div className="runway">
              <div ref={trailRef} className="trail" />
              <div className="lane lane-1" />
              <div className="lane lane-2" />
              <div className="lane lane-3" />
              <div ref={vehicleRef} className="vehicle">
                <div className="vehicle-glow" />
                <Vehicle />
              </div>
              <span className="runway-end">EXIT →</span>
            </div>
          </div>

          <div className="scroll-hint">
            <span className="mouse" />
            <span>Scroll to drive</span>
          </div>

          <div className="orb orb-a" />
          <div className="orb orb-b" />
        </div>
      </section>

      <section className="after-section">
        <div>
          <p className="eyebrow">THE MOTION CONTINUES</p>
          <h2>Scroll-linked animation without the noise.</h2>
          <p>
            Built with React, Tailwind CSS, and GSAP ScrollTrigger. The interaction uses transforms and a pinned
            stage so the experience stays smooth while the page remains responsive.
          </p>
        </div>
      </section>
    </main>
  )
}
