'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

// ─── Data ───────────────────────────────────────────────────────────
const skills = [
  {
    id: 'sales',
    name: 'Sales Outreach',
    tag: 'SDR',
    description: 'Lead research → personalized emails → follow-up sequences. Your SDR that never sleeps.',
    capabilities: ['Lead intelligence & scoring', 'Multi-touch email sequences', 'Objection handling playbooks', 'CRM-ready output format'],
    lines: 287,
    priceId: 'price_1T8MVl9TtKvyXKLaZRvFOCfW',
    accent: '#3b82f6',
  },
  {
    id: 'content',
    name: 'Content Pipeline',
    tag: 'OPS',
    description: 'Trend monitoring → drafting → publishing. Multi-platform content on autopilot.',
    capabilities: ['Industry trend detection', 'Platform-native formatting', 'Editorial calendar logic', 'Content repurposing chains'],
    lines: 312,
    priceId: 'price_1T8MVl9TtKvyXKLaOv4t1GuG',
    accent: '#a855f7',
  },
  {
    id: 'code',
    name: 'Code Review',
    tag: 'ENG',
    description: 'Security scanning → performance analysis → architecture review. Senior engineer on demand.',
    capabilities: ['OWASP vulnerability detection', 'Performance bottleneck analysis', 'Pre-commit quality gates', 'Refactoring suggestions'],
    lines: 274,
    priceId: 'price_1T8MVl9TtKvyXKLaW8xQtz2j',
    accent: '#f59e0b',
  },
  {
    id: 'support',
    name: 'Customer Support',
    tag: 'CX',
    description: 'Ticket triage → response drafting → escalation routing. Tier-1 that sounds human.',
    capabilities: ['Priority-based ticket triage', 'Tone-matched responses', 'Knowledge base integration', 'Customer health scoring'],
    lines: 298,
    priceId: 'price_1T8MVm9TtKvyXKLaHYUsf7lK',
    accent: '#10b981',
  },
  {
    id: 'seo',
    name: 'SEO Research',
    tag: 'GRO',
    description: 'Keyword research → competitor analysis → content briefs. Agency output, zero agency fees.',
    capabilities: ['Keyword cluster mapping', 'Competitor gap analysis', 'SERP feature targeting', 'SEO-optimized content briefs'],
    lines: 324,
    priceId: 'price_1T8MVm9TtKvyXKLaBW90KqF7',
    accent: '#ec4899',
    free: true,
  },
]

const bundlePriceId = 'price_1T8Miz9TtKvyXKLaDauenDe4'

// ─── Animated section wrapper ───────────────────────────────────────
function FadeIn({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Skill card ─────────────────────────────────────────────────────
function SkillCard({ skill, index, onCheckout, loading }) {
  const [hovered, setHovered] = useState(false)

  return (
    <FadeIn delay={index * 0.08}>
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className="group relative"
      >
        {/* Top accent line */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: skill.accent }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-none p-7 h-full flex flex-col
          group-hover:border-[var(--border-hover)] transition-colors duration-300">
          
          {/* Header */}
          <div className="flex items-start justify-between mb-5">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="mono text-[10px] font-semibold tracking-widest px-2 py-0.5 border"
                  style={{ color: skill.accent, borderColor: skill.accent + '40' }}>
                  {skill.tag}
                </span>
                {skill.free && (
                  <span className="mono text-[10px] font-semibold tracking-widest text-[var(--accent)] px-2 py-0.5 border border-[var(--accent-border)]">
                    FREE
                  </span>
                )}
              </div>
              <h3 className="text-lg font-semibold text-[var(--text)]">{skill.name}</h3>
            </div>
            <span className="mono text-xs text-[var(--text-3)]">{skill.lines} lines</span>
          </div>

          {/* Description */}
          <p className="text-sm text-[var(--text-2)] leading-relaxed mb-6">{skill.description}</p>

          {/* Capabilities */}
          <ul className="space-y-2.5 mb-7 flex-1">
            {skill.capabilities.map((cap, i) => (
              <li key={i} className="text-[13px] text-[var(--text-3)] flex items-start gap-2.5">
                <span className="text-[var(--text-3)] mt-1 text-[8px]">◆</span>
                {cap}
              </li>
            ))}
          </ul>

          {/* CTA */}
          {skill.free ? (
            <a href="/downloads/seo-research-agent-free.zip"
              className="block w-full text-center py-3 text-sm font-medium border border-[var(--accent-border)] text-[var(--accent)]
                hover:bg-[var(--accent-dim)] transition-all duration-200 mono tracking-wide">
              DOWNLOAD FREE →
            </a>
          ) : (
            <button
              onClick={() => onCheckout(skill.priceId, skill.name)}
              disabled={loading === skill.name}
              className="w-full py-3 text-sm font-medium border border-[var(--border)] text-[var(--text-2)]
                hover:border-[var(--border-hover)] hover:text-[var(--text)] transition-all duration-200 mono tracking-wide disabled:opacity-40">
              {loading === skill.name ? 'LOADING...' : '$19 →'}
            </button>
          )}
        </div>
      </motion.div>
    </FadeIn>
  )
}

// ─── Main ───────────────────────────────────────────────────────────
export default function Home() {
  const [loading, setLoading] = useState(null)
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -60])

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
      <nav className="fixed top-0 inset-x-0 z-50 bg-[var(--bg)]/80 backdrop-blur-xl border-b border-[var(--border)]">
        <div className="max-w-[1200px] mx-auto px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="font-semibold text-sm tracking-tight">LucidStack</span>
            <span className="text-[var(--text-3)] text-xs">·</span>
            <span className="mono text-xs text-[var(--text-3)]">Agent Skills</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#skills" className="text-xs text-[var(--text-3)] hover:text-[var(--text)] transition-colors">Skills</a>
            <a href="#pricing" className="text-xs text-[var(--text-3)] hover:text-[var(--text)] transition-colors">Pricing</a>
            <a href="mailto:support@lucidstack.ai" className="text-xs text-[var(--text-3)] hover:text-[var(--text)] transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      <main>
        {/* ─── Hero ─── */}
        <section ref={heroRef} className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
          {/* Background grid */}
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(0,212,170,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,212,170,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }} />
          
          {/* Center glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]
            bg-[var(--accent)] opacity-[0.02] rounded-full blur-[120px]" />

          <motion.div style={{ opacity: heroOpacity, y: heroY }} className="relative z-10 text-center px-8 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="mono text-[11px] tracking-[0.2em] text-[var(--accent)] mb-8 font-medium">
                FOR CLAUDE CODE · OPENCLAW · ANY SKILL.MD SYSTEM
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight mb-8"
            >
              One file.
              <br />
              <span className="text-[var(--text-3)]">Instant agent.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg text-[var(--text-2)] max-w-lg mx-auto leading-relaxed mb-12"
            >
              Drop a SKILL.md into your workspace. Claude reads it and becomes a specialized agent.
              No setup. No configuration. No prompt engineering.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex items-center justify-center gap-4"
            >
              <a href="/downloads/seo-research-agent-free.zip"
                className="px-7 py-3 bg-[var(--accent)] text-[var(--bg)] font-semibold text-sm
                  hover:brightness-110 transition-all duration-200">
                Download free sample
              </a>
              <button
                onClick={() => handleCheckout(bundlePriceId, 'hero-bundle')}
                disabled={loading === 'hero-bundle'}
                className="px-7 py-3 border border-[var(--border)] text-sm text-[var(--text-2)]
                  hover:border-[var(--border-hover)] hover:text-[var(--text)] transition-all duration-200 disabled:opacity-40">
                {loading === 'hero-bundle' ? 'Loading...' : 'All 5 for $29 →'}
              </button>
            </motion.div>

            {/* Terminal preview */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="mt-20 text-left max-w-xl mx-auto"
            >
              <div className="bg-[var(--surface)] border border-[var(--border)] overflow-hidden">
                <div className="px-4 py-2.5 border-b border-[var(--border)] flex items-center gap-6">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                  </div>
                  <span className="mono text-[11px] text-[var(--text-3)]">~/project</span>
                </div>
                <div className="p-5 mono text-[13px] leading-[1.8] text-[var(--text-3)]">
                  <div><span className="text-[var(--accent)]">$</span> cp sales-outreach-agent/SKILL.md ~/.claude/skills/</div>
                  <div className="text-[var(--text-3)] opacity-50">copied.</div>
                  <div className="mt-2"><span className="text-[var(--accent)]">$</span> claude</div>
                  <div className="mt-1 text-[var(--text-2)]">Skill loaded: <span className="text-[var(--accent)]">sales-outreach-agent</span></div>
                  <div className="text-[var(--text-2)]">Ready. Try: &quot;Research leads at Acme Corp&quot;</div>
                  <div className="mt-2"><span className="text-[var(--accent)]">$</span> <span className="animate-pulse">▊</span></div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-5 h-8 border border-[var(--border)] rounded-full flex items-start justify-center p-1.5"
            >
              <div className="w-1 h-1.5 bg-[var(--text-3)] rounded-full" />
            </motion.div>
          </motion.div>
        </section>

        {/* ─── How it works ─── */}
        <section className="py-32 px-8">
          <div className="max-w-[1200px] mx-auto">
            <FadeIn>
              <div className="grid grid-cols-12 gap-8 items-center">
                <div className="col-span-5">
                  <span className="mono text-[11px] tracking-[0.2em] text-[var(--accent)] font-medium">HOW IT WORKS</span>
                  <h2 className="text-3xl font-bold mt-4 mb-6 leading-tight">
                    No SDK.<br />No config.<br />
                    <span className="text-[var(--text-3)]">Just markdown.</span>
                  </h2>
                  <p className="text-[var(--text-2)] leading-relaxed">
                    A skill is a structured markdown file that teaches Claude a specific workflow.
                    Trigger phrases, examples, edge cases, and troubleshooting — all in one file.
                    Built following Anthropic&apos;s official guide.
                  </p>
                </div>
                <div className="col-span-7">
                  <div className="space-y-px">
                    {[
                      { num: '01', title: 'Download the skill', detail: 'Each skill is a single SKILL.md file with optional config templates.' },
                      { num: '02', title: 'Drop it in your workspace', detail: 'Copy to your skills/ or .claude/ directory. No installation needed.' },
                      { num: '03', title: 'Start using it', detail: 'Claude auto-detects the skill and activates its workflows on matching prompts.' },
                    ].map((step, i) => (
                      <FadeIn key={i} delay={i * 0.12}>
                        <div className="bg-[var(--surface)] border border-[var(--border)] p-6 flex gap-6
                          hover:border-[var(--border-hover)] transition-colors duration-300 group">
                          <span className="mono text-2xl font-bold text-[var(--text-3)] group-hover:text-[var(--accent)] transition-colors">
                            {step.num}
                          </span>
                          <div>
                            <h3 className="font-semibold mb-1">{step.title}</h3>
                            <p className="text-sm text-[var(--text-3)]">{step.detail}</p>
                          </div>
                        </div>
                      </FadeIn>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ─── Skills grid ─── */}
        <section id="skills" className="py-32 px-8 border-t border-[var(--border)]">
          <div className="max-w-[1200px] mx-auto">
            <FadeIn>
              <div className="flex items-end justify-between mb-16">
                <div>
                  <span className="mono text-[11px] tracking-[0.2em] text-[var(--accent)] font-medium">CATALOG</span>
                  <h2 className="text-3xl font-bold mt-4">Five agents, ready to deploy.</h2>
                </div>
                <span className="mono text-xs text-[var(--text-3)]">v1.1.0 · Anthropic-compliant</span>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border)]">
              {skills.map((skill, i) => (
                <SkillCard key={skill.id} skill={skill} index={i} onCheckout={handleCheckout} loading={loading} />
              ))}

              {/* Bundle card */}
              <FadeIn delay={skills.length * 0.08}>
                <div className="bg-[var(--surface)] border border-[var(--accent-border)] p-7 h-full flex flex-col relative">
                  <div className="absolute top-0 left-0 right-0 h-px bg-[var(--accent)]" />
                  
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <div className="mono text-[10px] font-semibold tracking-widest text-[var(--accent)] px-2 py-0.5 border border-[var(--accent-border)] mb-2 inline-block">
                        BUNDLE
                      </div>
                      <h3 className="text-lg font-semibold">All Five Skills</h3>
                    </div>
                  </div>

                  <p className="text-sm text-[var(--text-2)] leading-relaxed mb-4">
                    Every skill in the catalog. One purchase.
                  </p>

                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-3xl font-bold text-[var(--accent)]">$29</span>
                    <span className="text-sm text-[var(--text-3)] line-through">$95</span>
                  </div>
                  <p className="mono text-xs text-[var(--accent)] mb-7">SAVE 69% · LAUNCH PRICE</p>

                  <div className="flex-1" />

                  <button
                    onClick={() => handleCheckout(bundlePriceId, 'bundle')}
                    disabled={loading === 'bundle'}
                    className="w-full py-3.5 text-sm font-semibold bg-[var(--accent)] text-[var(--bg)]
                      hover:brightness-110 transition-all duration-200 mono tracking-wide disabled:opacity-40">
                    {loading === 'bundle' ? 'LOADING...' : 'GET THE BUNDLE →'}
                  </button>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ─── Pricing comparison ─── */}
        <section id="pricing" className="py-32 px-8 border-t border-[var(--border)]">
          <div className="max-w-[800px] mx-auto">
            <FadeIn>
              <div className="text-center mb-16">
                <span className="mono text-[11px] tracking-[0.2em] text-[var(--accent)] font-medium">PRICING</span>
                <h2 className="text-3xl font-bold mt-4 mb-4">Simple math.</h2>
                <p className="text-[var(--text-2)]">Try free. Buy what you need.</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="bg-[var(--surface)] border border-[var(--border)]">
                <div className="grid grid-cols-4 border-b border-[var(--border)]">
                  <div className="p-5 border-r border-[var(--border)]">
                    <span className="mono text-[11px] text-[var(--text-3)]">PLAN</span>
                  </div>
                  <div className="p-5 border-r border-[var(--border)] text-center">
                    <span className="mono text-[11px] text-[var(--text-3)]">FREE</span>
                  </div>
                  <div className="p-5 border-r border-[var(--border)] text-center">
                    <span className="mono text-[11px] text-[var(--text-3)]">INDIVIDUAL</span>
                  </div>
                  <div className="p-5 text-center bg-[var(--accent-dim)]">
                    <span className="mono text-[11px] text-[var(--accent)]">BUNDLE</span>
                  </div>
                </div>

                {[
                  { label: 'Price', free: '$0', individual: '$19/ea', bundle: '$29' },
                  { label: 'Skills included', free: '1', individual: '1', bundle: '5' },
                  { label: 'Cost per skill', free: 'Free', individual: '$19', bundle: '$5.80' },
                  { label: 'Future updates', free: '✓', individual: '✓', bundle: '✓' },
                  { label: 'Config templates', free: '—', individual: '✓', bundle: '✓' },
                  { label: 'Priority support', free: '—', individual: '—', bundle: '✓' },
                ].map((row, i) => (
                  <div key={i} className="grid grid-cols-4 border-b border-[var(--border)] last:border-0">
                    <div className="p-4 border-r border-[var(--border)] text-sm text-[var(--text-2)]">{row.label}</div>
                    <div className="p-4 border-r border-[var(--border)] text-sm text-[var(--text-3)] text-center mono">{row.free}</div>
                    <div className="p-4 border-r border-[var(--border)] text-sm text-[var(--text-2)] text-center mono">{row.individual}</div>
                    <div className="p-4 text-sm text-[var(--accent)] text-center mono bg-[var(--accent-dim)]">{row.bundle}</div>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="mt-8 flex gap-4">
                <a href="/downloads/seo-research-agent-free.zip"
                  className="flex-1 py-3.5 text-center text-sm font-medium border border-[var(--border)] text-[var(--text-2)]
                    hover:border-[var(--border-hover)] hover:text-[var(--text)] transition-all duration-200">
                  Download free sample
                </a>
                <button
                  onClick={() => handleCheckout(bundlePriceId, 'pricing-bundle')}
                  disabled={loading === 'pricing-bundle'}
                  className="flex-1 py-3.5 text-center text-sm font-semibold bg-[var(--accent)] text-[var(--bg)]
                    hover:brightness-110 transition-all duration-200 disabled:opacity-40">
                  {loading === 'pricing-bundle' ? 'Loading...' : 'Get the bundle — $29'}
                </button>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section className="py-32 px-8 border-t border-[var(--border)]">
          <div className="max-w-[800px] mx-auto">
            <FadeIn>
              <span className="mono text-[11px] tracking-[0.2em] text-[var(--accent)] font-medium">FAQ</span>
              <h2 className="text-3xl font-bold mt-4 mb-16">Common questions.</h2>
            </FadeIn>

            {[
              { q: 'What is a SKILL.md file?', a: 'A structured markdown file that gives Claude specialized instructions for a specific workflow. Frontmatter defines metadata and trigger phrases. The body contains detailed instructions, examples, and edge cases. Think of it as a training manual, not a one-off prompt.' },
              { q: 'What tools do I need?', a: 'Claude Code, OpenClaw, or any agent system that reads SKILL.md files. No special software, API keys, or infrastructure. Just a text file in the right directory.' },
              { q: 'Can I edit them?', a: 'They\'re plain markdown. Edit anything — workflows, tone, terminology, examples. That\'s the point. These are starting points you make your own.' },
              { q: 'How is this different from a ChatGPT prompt?', a: 'Skills are persistent, structured, and auto-activating. Claude loads them every session without you re-pasting anything. They include trigger phrases, multi-step workflows, real examples, config templates, and troubleshooting. It\'s the difference between giving verbal instructions and giving someone a training manual.' },
              { q: 'What if it doesn\'t work for my use case?', a: 'Download the free SEO Research Agent first. It\'s the full product — not a demo. If that workflow pattern works for you, the others follow the same structure.' },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className="border-b border-[var(--border)] py-7 group">
                  <h3 className="font-semibold mb-3 text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">{item.q}</h3>
                  <p className="text-sm text-[var(--text-3)] leading-relaxed max-w-2xl">{item.a}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ─── Footer ─── */}
        <footer className="border-t border-[var(--border)] py-12 px-8">
          <div className="max-w-[1200px] mx-auto flex items-center justify-between">
            <div className="flex items-center gap-6">
              <span className="text-sm font-medium text-[var(--text-3)]">LucidStack</span>
              <span className="mono text-xs text-[var(--text-3)]">© 2026</span>
            </div>
            <a href="mailto:support@lucidstack.ai" className="mono text-xs text-[var(--text-3)] hover:text-[var(--accent)] transition-colors">
              support@lucidstack.ai
            </a>
          </div>
        </footer>
      </main>
    </>
  )
}
