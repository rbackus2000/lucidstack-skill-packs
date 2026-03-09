'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

// ─── Data ───────────────────────────────────────────────────────────
const skills = [
  {
    id: 'web-design',
    name: 'Premium Web Design',
    description: 'Build award-quality websites that break every AI design pattern',
    capabilities: ['6 design directions with references', 'Choreographed Framer Motion animations', '7 typography pairings (no Inter/Poppins)', 'Anti-pattern checklist (10 checks)'],
    lines: 372,
    priceId: 'price_1T8sOa9TtKvyXKLaclSxAmUG',
    featured: true,
  },
  {
    id: 'sales',
    name: 'Sales Outreach',
    description: 'Lead research → personalized emails → follow-up sequences',
    capabilities: ['Lead intelligence & scoring', 'Multi-touch email sequences', 'Objection handling playbooks', 'CRM-ready output'],
    lines: 287,
    priceId: 'price_1T8MVl9TtKvyXKLaZRvFOCfW',
  },
  {
    id: 'content',
    name: 'Content Pipeline',
    description: 'Trend monitoring → drafting → multi-platform publishing',
    capabilities: ['Industry trend detection', 'Platform-native formatting', 'Editorial calendar logic', 'Content repurposing'],
    lines: 312,
    priceId: 'price_1T8MVl9TtKvyXKLaOv4t1GuG',
  },
  {
    id: 'code',
    name: 'Code Review',
    description: 'Security scanning → performance analysis → architecture review',
    capabilities: ['OWASP vulnerability detection', 'Performance bottleneck analysis', 'Pre-commit quality gates', 'Refactoring suggestions'],
    lines: 274,
    priceId: 'price_1T8MVl9TtKvyXKLaW8xQtz2j',
  },
  {
    id: 'support',
    name: 'Customer Support',
    description: 'Ticket triage → response drafting → escalation routing',
    capabilities: ['Priority-based triage', 'Tone-matched responses', 'Knowledge base integration', 'Customer health scoring'],
    lines: 298,
    priceId: 'price_1T8MVm9TtKvyXKLaHYUsf7lK',
  },
  {
    id: 'seo',
    name: 'SEO Research',
    description: 'Keyword research → competitor analysis → content briefs',
    capabilities: ['Keyword cluster mapping', 'Competitor gap analysis', 'SERP feature targeting', 'Content optimization briefs'],
    lines: 324,
    priceId: 'price_1T8MVm9TtKvyXKLaBW90KqF7',
    free: true,
  },
]

const bundlePriceId = 'price_1T8Miz9TtKvyXKLaDauenDe4'

// ─── Section animation ──────────────────────────────────────────────
function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Main ───────────────────────────────────────────────────────────
export default function Home() {
  const [loading, setLoading] = useState(null)
  const [hoveredSkill, setHoveredSkill] = useState(null)

  const handleCheckout = async (priceId, label) => {
    setLoading(label)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch (err) { console.error(err) }
    setLoading(null)
  }

  return (
    <>
      {/* ─── Nav ─── */}
      <nav className="sticky top-0 z-50 bg-[var(--bg)]/90 backdrop-blur-lg border-b border-[var(--border)]">
        <div className="max-w-[1100px] mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-semibold text-[15px] tracking-tight text-[var(--text)]">LucidStack</span>
          <div className="flex items-center gap-8">
            <a href="#skills" className="text-[13px] text-[var(--text-2)] hover:text-[var(--text)] transition-colors">Skills</a>
            <a href="#pricing" className="text-[13px] text-[var(--text-2)] hover:text-[var(--text)] transition-colors">Pricing</a>
            <a href="mailto:support@lucidstack.ai" className="text-[13px] text-[var(--text-2)] hover:text-[var(--text)] transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      <main>
        {/* ─── Hero ─── */}
        <section className="pt-24 pb-20 px-6 overflow-hidden">
          <div className="max-w-[1100px] mx-auto relative">
            {/* Floating skill tags — scattered around the hero */}
            {[
              { label: 'sales-outreach', x: '72%', y: '8%', delay: 1.5, dur: 18 },
              { label: 'code-review', x: '85%', y: '35%', delay: 2.1, dur: 22 },
              { label: 'content-pipeline', x: '68%', y: '62%', delay: 1.8, dur: 20 },
              { label: 'customer-support', x: '90%', y: '75%', delay: 2.5, dur: 16 },
              { label: 'seo-research', x: '78%', y: '90%', delay: 1.2, dur: 24 },
            ].map((tag, i) => (
              <motion.div
                key={i}
                className="absolute hidden lg:block mono text-[11px] text-[var(--text-3)]/40 select-none pointer-events-none"
                style={{ left: tag.x, top: tag.y }}
                initial={{ opacity: 0, x: 20 }}
                animate={{
                  opacity: [0, 0.4, 0.4, 0],
                  y: [0, -30, -60, -90],
                }}
                transition={{
                  duration: tag.dur,
                  delay: tag.delay,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                {tag.label}.md
              </motion.div>
            ))}

            <div className="max-w-2xl relative z-10">
              {/* Animated label */}
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mono text-[12px] tracking-wide text-[var(--accent)] font-medium mb-6 flex items-center gap-2"
              >
                <motion.span
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent)]"
                />
                Agent Skills for Claude Code
              </motion.p>

              {/* Headline with staggered word reveal */}
              <h1 className="text-[clamp(2.8rem,5.5vw,4.2rem)] font-bold leading-[1.08] tracking-tight mb-6">
                {['Teach', 'Claude'].map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
                    className="inline-block mr-[0.3em]"
                  >
                    {word}
                  </motion.span>
                ))}
                <br />
                {['once.', 'Benefit'].map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.6, delay: 0.55 + i * 0.12 }}
                    className="inline-block mr-[0.3em]"
                  >
                    {word}
                  </motion.span>
                ))}
                <br />
                <motion.span
                  initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="inline-block"
                >
                  every{' '}
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.6, delay: 0.92 }}
                  className="inline-block relative"
                >
                  session.
                  {/* Underline draw */}
                  <motion.span
                    className="absolute -bottom-1 left-0 h-[3px] bg-[var(--accent)] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.8, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
                  />
                </motion.span>
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                className="text-xl text-[var(--text-2)] leading-relaxed max-w-lg mb-10"
              >
                Drop a SKILL.md file into your workspace. Claude loads it automatically 
                and becomes a specialized agent. No configuration needed.
              </motion.p>

              {/* CTA buttons with stagger */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.3 }}
                className="flex items-center gap-4"
              >
                <motion.a
                  href="/downloads/seo-research-agent-free.zip"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--text)] text-[var(--bg)] text-[14px] font-medium
                    rounded-full hover:bg-[var(--text-2)] transition-colors"
                >
                  Download free sample
                  <motion.svg
                    width="14" height="14" viewBox="0 0 14 14" fill="none"
                    animate={{ y: [0, 2, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <path d="M7 1v9m0 0L3 6.5M7 10l4-3.5M2 13h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </motion.svg>
                </motion.a>
                <motion.button
                  whileHover={{ x: 4 }}
                  onClick={() => handleCheckout(bundlePriceId, 'hero')}
                  disabled={loading === 'hero'}
                  className="inline-flex items-center gap-2 px-6 py-3 text-[14px] font-medium text-[var(--text-2)]
                    hover:text-[var(--text)] transition-colors disabled:opacity-40"
                >
                  {loading === 'hero' ? 'Loading...' : 'Get all 5 — $29 →'}
                </motion.button>
              </motion.div>
            </div>

            {/* Terminal with typewriter effect */}
            <motion.div
              initial={{ opacity: 0, y: 40, rotateX: 8 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 1, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-16 max-w-2xl"
              style={{ perspective: 800 }}
            >
              <div className="bg-[var(--code-bg)] rounded-xl overflow-hidden shadow-2xl shadow-black/10
                hover:shadow-black/20 transition-shadow duration-500">
                <div className="px-4 py-3 flex items-center gap-2 border-b border-white/5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                  <span className="mono text-[11px] text-white/30 ml-4">Terminal</span>
                </div>
                <div className="p-6 mono text-[13px] leading-[2] text-white/60">
                  {/* Line 1 — staggered reveal */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.0 }}
                  >
                    <span className="text-emerald-400">~</span> cp skill.md .claude/skills/sales-outreach/
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5 }}
                    className="text-white/25"
                  >
                    done.
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3.0 }}
                    className="mt-1"
                  >
                    <span className="text-emerald-400">~</span> claude
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3.5 }}
                    className="text-white/80"
                  >
                    Loaded: <span className="text-amber-300">sales-outreach-agent</span>{' '}
                    <span className="text-white/30">(287 lines, 8 triggers, 3 workflows)</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 4.0 }}
                    className="text-white/50"
                  >
                    Try: &ldquo;Research leads at Stripe&rdquo;
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 4.3 }}
                    className="mt-1"
                  >
                    <span className="text-emerald-400">~</span>{' '}
                    <span className="animate-pulse text-white/60">▊</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── What's inside ─── */}
        <section className="py-24 px-6 border-t border-[var(--border)]">
          <div className="max-w-[1100px] mx-auto grid grid-cols-12 gap-12">
            <div className="col-span-4">
              <Reveal>
                <p className="mono text-[12px] tracking-wide text-[var(--accent)] font-medium mb-4">What&apos;s inside</p>
                <h2 className="text-3xl font-bold leading-tight mb-5">
                  Not prompts.<br />
                  Training manuals.
                </h2>
                <p className="text-[var(--text-2)] leading-relaxed text-[15px]">
                  Each skill is 250–325 lines of structured instructions, examples, 
                  and edge cases. Built following Anthropic&apos;s official guide.
                </p>
              </Reveal>
            </div>
            <div className="col-span-8">
              <Reveal delay={0.15}>
                <div className="grid grid-cols-2 gap-px bg-[var(--border)]">
                  {[
                    { title: 'Trigger Phrases', desc: 'Auto-activates on matching prompts. No manual invocation needed.', num: '5–8', unit: 'per skill' },
                    { title: 'Workflow Steps', desc: 'Multi-step processes with decision trees and branching logic.', num: '3–5', unit: 'workflows' },
                    { title: 'Real Examples', desc: 'Concrete input/output pairs Claude can reference during execution.', num: '3', unit: 'per skill' },
                    { title: 'Troubleshooting', desc: 'Common failure modes and recovery patterns built in.', num: '3', unit: 'per skill' },
                  ].map((item, i) => (
                    <div key={i} className="bg-[var(--surface)] p-7 group hover:bg-[var(--surface-2)] transition-colors">
                      <div className="flex items-baseline justify-between mb-3">
                        <h3 className="font-semibold text-[15px]">{item.title}</h3>
                        <span className="mono text-xs text-[var(--text-3)]">{item.num} {item.unit}</span>
                      </div>
                      <p className="text-[13px] text-[var(--text-3)] leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ─── Skills ─── */}
        <section id="skills" className="py-24 px-6 border-t border-[var(--border)]">
          <div className="max-w-[1100px] mx-auto">
            <Reveal>
              <div className="flex items-end justify-between mb-14">
                <div>
                  <p className="mono text-[12px] tracking-wide text-[var(--accent)] font-medium mb-4">Catalog</p>
                  <h2 className="text-3xl font-bold">Six agents. Ready to deploy.</h2>
                </div>
                <p className="mono text-xs text-[var(--text-3)]">v1.1.0</p>
              </div>
            </Reveal>

            <div className="space-y-px">
              {skills.map((skill, i) => (
                <Reveal key={skill.id} delay={i * 0.05}>
                  <div
                    onMouseEnter={() => setHoveredSkill(skill.id)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className="border-t border-[var(--border)] py-8 grid grid-cols-12 gap-8 items-start group cursor-default
                      hover:bg-[var(--surface-2)] transition-colors px-6 -mx-6"
                  >
                    {/* Name + tag */}
                    <div className="col-span-3 flex items-start gap-3">
                      <motion.span
                        animate={{ x: hoveredSkill === skill.id ? 6 : 0 }}
                        className="text-lg font-semibold group-hover:text-[var(--accent)] transition-colors"
                      >
                        {skill.name}
                      </motion.span>
                      {skill.featured && (
                        <span className="mono text-[10px] font-medium text-amber-600 border border-amber-600/30 bg-amber-50 px-1.5 py-0.5 rounded">
                          NEW
                        </span>
                      )}
                      {skill.free && (
                        <span className="mono text-[10px] font-medium text-[var(--accent)] border border-[var(--accent)]/30 px-1.5 py-0.5 rounded">
                          FREE
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <div className="col-span-4">
                      <p className="text-[14px] text-[var(--text-2)] leading-relaxed">{skill.description}</p>
                    </div>

                    {/* Capabilities (show on hover) */}
                    <div className="col-span-3">
                      <motion.ul
                        initial={false}
                        animate={{ opacity: hoveredSkill === skill.id ? 1 : 0 }}
                        className="space-y-1"
                      >
                        {skill.capabilities.map((c, j) => (
                          <li key={j} className="text-[12px] text-[var(--text-3)]">↳ {c}</li>
                        ))}
                      </motion.ul>
                    </div>

                    {/* CTA */}
                    <div className="col-span-2 text-right">
                      {skill.free ? (
                        <a href="/downloads/seo-research-agent-free.zip"
                          className="mono text-[12px] font-medium text-[var(--accent)] hover:underline">
                          Download →
                        </a>
                      ) : (
                        <button
                          onClick={() => handleCheckout(skill.priceId, skill.name)}
                          disabled={loading === skill.name}
                          className="mono text-[12px] font-medium text-[var(--text-3)] group-hover:text-[var(--text)] transition-colors disabled:opacity-40">
                          {loading === skill.name ? '...' : skill.featured ? '$29 →' : '$19 →'}
                        </button>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}

              {/* Bundle row */}
              <Reveal delay={0.3}>
                <div className="border-t border-b border-[var(--border)] py-8 grid grid-cols-12 gap-8 items-center
                  bg-[var(--accent-soft)] px-6 -mx-6">
                  <div className="col-span-3">
                    <span className="text-lg font-semibold text-[var(--accent)]">Full Bundle</span>
                  </div>
                  <div className="col-span-4">
                    <p className="text-[14px] text-[var(--text-2)]">
                      All five skills. <span className="line-through text-[var(--text-3)]">$95</span> → <span className="font-semibold text-[var(--text)]">$29</span>
                      <span className="mono text-[11px] text-[var(--accent)] ml-2">save 69%</span>
                    </p>
                  </div>
                  <div className="col-span-3">
                    <p className="mono text-[12px] text-[var(--text-3)]">Launch price · limited time</p>
                  </div>
                  <div className="col-span-2 text-right">
                    <button
                      onClick={() => handleCheckout(bundlePriceId, 'bundle')}
                      disabled={loading === 'bundle'}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] text-white text-[13px] font-medium
                        rounded-full hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-40">
                      {loading === 'bundle' ? '...' : 'Get bundle →'}
                    </button>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ─── How it works ─── */}
        <section className="py-24 px-6 border-t border-[var(--border)]">
          <div className="max-w-[1100px] mx-auto">
            <Reveal>
              <p className="mono text-[12px] tracking-wide text-[var(--accent)] font-medium mb-4">How it works</p>
              <h2 className="text-3xl font-bold mb-16">Download. Drop in. Done.</h2>
            </Reveal>
            <div className="grid grid-cols-3 gap-16">
              {[
                { num: '01', title: 'Download', desc: 'Get the SKILL.md file. Each skill is a single file — no dependencies, no installation, no build step.' },
                { num: '02', title: 'Place it', desc: 'Copy to your .claude/skills/ directory or anywhere in your workspace. Claude auto-discovers it.' },
                { num: '03', title: 'Use it', desc: 'Just start talking. Trigger phrases activate the right workflows automatically. No commands to remember.' },
              ].map((step, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div>
                    <span className="mono text-4xl font-bold text-[var(--border)]">{step.num}</span>
                    <h3 className="text-lg font-semibold mt-4 mb-3">{step.title}</h3>
                    <p className="text-[14px] text-[var(--text-3)] leading-relaxed">{step.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Pricing ─── */}
        <section id="pricing" className="py-24 px-6 border-t border-[var(--border)]">
          <div className="max-w-[700px] mx-auto">
            <Reveal>
              <p className="mono text-[12px] tracking-wide text-[var(--accent)] font-medium mb-4">Pricing</p>
              <h2 className="text-3xl font-bold mb-4">Try free. Buy what you need.</h2>
              <p className="text-[var(--text-2)] mb-14">No subscriptions. One-time purchase. Yours forever.</p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="space-y-6">
                {/* Free */}
                <div className="flex items-center justify-between py-5 border-b border-[var(--border)]">
                  <div>
                    <h3 className="font-semibold">Free Sample</h3>
                    <p className="text-[13px] text-[var(--text-3)] mt-1">Full SEO Research Agent — no signup required</p>
                  </div>
                  <a href="/downloads/seo-research-agent-free.zip"
                    className="mono text-[13px] font-medium text-[var(--accent)] hover:underline">
                    Download →
                  </a>
                </div>

                {/* Individual */}
                <div className="flex items-center justify-between py-5 border-b border-[var(--border)]">
                  <div>
                    <h3 className="font-semibold">Individual Skill</h3>
                    <p className="text-[13px] text-[var(--text-3)] mt-1">Any single agent from the catalog</p>
                  </div>
                  <span className="mono text-lg font-semibold">$19</span>
                </div>

                {/* Bundle */}
                <div className="flex items-center justify-between py-5 px-6 -mx-6 bg-[var(--accent-soft)] rounded-xl">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold">Full Bundle</h3>
                      <span className="mono text-[10px] font-medium text-[var(--accent)] bg-white px-2 py-0.5 rounded-full">BEST VALUE</span>
                    </div>
                    <p className="text-[13px] text-[var(--text-3)] mt-1">
                      All 5 skills · <span className="line-through">$95</span> → $29 · save 69%
                    </p>
                  </div>
                  <button
                    onClick={() => handleCheckout(bundlePriceId, 'pricing')}
                    disabled={loading === 'pricing'}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--text)] text-[var(--bg)] text-[13px] font-medium
                      rounded-full hover:bg-[var(--text-2)] transition-colors disabled:opacity-40">
                    {loading === 'pricing' ? '...' : 'Get bundle →'}
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section className="py-24 px-6 border-t border-[var(--border)]">
          <div className="max-w-[700px] mx-auto">
            <Reveal>
              <p className="mono text-[12px] tracking-wide text-[var(--accent)] font-medium mb-4">FAQ</p>
              <h2 className="text-3xl font-bold mb-14">Questions</h2>
            </Reveal>

            {[
              { q: 'What is a SKILL.md file?', a: 'A structured markdown file that teaches Claude specific workflows. Frontmatter defines trigger phrases. The body has instructions, examples, and edge cases. It\'s a training manual, not a one-off prompt.' },
              { q: 'What tools do I need?', a: 'Claude Code, OpenClaw, or any system that reads SKILL.md files. No special software or API keys.' },
              { q: 'Can I customize them?', a: 'They\'re plain markdown. Change anything — workflows, terminology, examples. They\'re starting points.' },
              { q: 'How is this different from a prompt?', a: 'Skills persist across sessions, auto-activate on matching prompts, include multi-step workflows with decision logic, and have troubleshooting built in. Prompts disappear when you close the chat.' },
              { q: 'What if I don\'t like it?', a: 'Download the free SEO Research Agent first. Same quality, same structure. If it works for you, the others will too.' },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <div className="py-6 border-b border-[var(--border)] group">
                  <h3 className="font-semibold text-[15px] mb-2 group-hover:text-[var(--accent)] transition-colors cursor-default">
                    {item.q}
                  </h3>
                  <p className="text-[14px] text-[var(--text-3)] leading-relaxed">{item.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ─── Final CTA ─── */}
        <section className="py-24 px-6 border-t border-[var(--border)]">
          <div className="max-w-[700px] mx-auto text-center">
            <Reveal>
              <h2 className="text-3xl font-bold mb-4">Stop re-explaining your workflows.</h2>
              <p className="text-[var(--text-2)] mb-10 text-lg">Teach Claude once. Let it remember.</p>
              <div className="flex items-center justify-center gap-4">
                <a href="/downloads/seo-research-agent-free.zip"
                  className="inline-flex items-center gap-2 px-7 py-3 bg-[var(--text)] text-[var(--bg)] text-[14px] font-medium
                    rounded-full hover:bg-[var(--text-2)] transition-colors">
                  Try the free sample
                </a>
                <button
                  onClick={() => handleCheckout(bundlePriceId, 'bottom')}
                  disabled={loading === 'bottom'}
                  className="inline-flex items-center gap-2 px-7 py-3 border border-[var(--border)] text-[14px] font-medium
                    rounded-full hover:border-[var(--border-hover)] transition-colors disabled:opacity-40">
                  {loading === 'bottom' ? '...' : 'All 5 for $29 →'}
                </button>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ─── Footer ─── */}
        <footer className="border-t border-[var(--border)] py-10 px-6">
          <div className="max-w-[1100px] mx-auto flex items-center justify-between">
            <span className="text-[13px] text-[var(--text-3)]">© 2026 LucidStack.ai</span>
            <a href="mailto:support@lucidstack.ai" className="mono text-[12px] text-[var(--text-3)] hover:text-[var(--text)] transition-colors">
              support@lucidstack.ai
            </a>
          </div>
        </footer>
      </main>
    </>
  )
}
