'use client'

import { useState } from 'react'
import { Target, FileText, Search, MessageSquare, BarChart3, Package, ArrowRight, Check, Zap, Download, Code, ChevronRight } from 'lucide-react'

const skills = [
  {
    name: 'Sales Outreach Agent',
    description: 'AI-powered lead research, personalized cold emails, and automated follow-up sequences.',
    features: ['Lead intelligence research', 'Personalized email drafting', 'Follow-up cadence management', 'Response analysis & objection handling'],
    Icon: Target,
    iconBg: 'bg-gradient-to-br from-blue-500/20 to-blue-600/5 border border-blue-500/25',
    priceId: 'price_1T8MVl9TtKvyXKLaZRvFOCfW',
  },
  {
    name: 'Content Pipeline Agent',
    description: 'End-to-end content ops. Trend monitoring, multi-platform drafting, and publishing workflows.',
    features: ['Industry trend monitoring', 'LinkedIn, X, blog, newsletter drafting', 'Editorial calendar management', 'Content repurposing engine'],
    Icon: FileText,
    iconBg: 'bg-gradient-to-br from-purple-500/20 to-purple-600/5 border border-purple-500/25',
    priceId: 'price_1T8MVl9TtKvyXKLaOv4t1GuG',
  },
  {
    name: 'Code Review Agent',
    description: 'Senior-engineer-level code reviews. Security audits, performance analysis, and pre-commit checks.',
    features: ['OWASP security scanning', 'Performance bottleneck detection', 'Pre-commit quality gates', 'Architecture review'],
    Icon: Code,
    iconBg: 'bg-gradient-to-br from-amber-500/20 to-amber-600/5 border border-amber-500/25',
    priceId: 'price_1T8MVl9TtKvyXKLaW8xQtz2j',
  },
  {
    name: 'Customer Support Agent',
    description: 'AI tier-1 support that sounds human. Ticket triage, response drafting, and escalation routing.',
    features: ['Intelligent ticket triage', 'Human-sounding response drafts', 'Auto-learning knowledge base', 'Customer health scoring'],
    Icon: MessageSquare,
    iconBg: 'bg-gradient-to-br from-emerald-500/20 to-emerald-600/5 border border-emerald-500/25',
    priceId: 'price_1T8MVm9TtKvyXKLaHYUsf7lK',
  },
  {
    name: 'SEO Research Agent',
    description: 'Agency-quality SEO without the agency. Keyword research, competitor analysis, and content briefs.',
    features: ['Keyword cluster research', 'Competitor gap analysis', 'SERP feature analysis', 'SEO content brief generation'],
    Icon: BarChart3,
    iconBg: 'bg-gradient-to-br from-pink-500/20 to-pink-600/5 border border-pink-500/25',
    priceId: 'price_1T8MVm9TtKvyXKLaBW90KqF7',
    free: true,
  },
]

const bundlePriceId = 'price_1T8Miz9TtKvyXKLaDauenDe4'

export default function Home() {
  const [loading, setLoading] = useState(null)

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
    } catch (err) {
      console.error(err)
    }
    setLoading(null)
  }

  return (
    <>
      {/* Glow orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <main className="min-h-screen">
        {/* Nav */}
        <nav className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">LS</span>
            </div>
            <span className="text-white font-semibold text-lg">LucidStack</span>
          </div>
          <a href="mailto:support@lucidstack.ai" className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors">
            support@lucidstack.ai
          </a>
        </nav>

        {/* Hero */}
        <section className="max-w-6xl mx-auto px-6 pt-16 pb-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="badge mb-8">
              <Zap className="w-4 h-4" />
              For Claude Code &amp; OpenClaw
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
              Drop-in <span className="gradient-text">AI Agent Skills</span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-4 leading-relaxed">
              One file. Instant agent. No prompt engineering required.
              Just drop a SKILL.md into your workspace.
            </p>
            <p className="text-sm text-zinc-600 mb-12">
              Built following Anthropic&apos;s official skill guide &middot; v1.1.0
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="flex flex-col md:flex-row gap-6 max-w-4xl mx-auto items-stretch">
            {/* Free Sample */}
            <div className="flex-1 glass rounded-2xl p-8 flex flex-col">
              <div className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-4">Free Sample</div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-extrabold text-white">$0</span>
              </div>
              <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                Try the full SEO Research Agent. No signup, no email, no limits.
              </p>
              <ul className="space-y-3 mb-8 flex-1">
                {['Full SEO Research skill', 'Keyword research', 'Competitor analysis', 'Content briefs', 'No email required'].map((f, i) => (
                  <li key={i} className="text-zinc-400 text-sm flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="/downloads/seo-research-agent-free.zip"
                className="btn-green flex items-center justify-center gap-2 w-full text-white font-semibold py-3 px-6 rounded-xl text-sm"
              >
                <Download className="w-4 h-4" /> Download Free
              </a>
            </div>

            {/* Bundle — Hero */}
            <div className="flex-1 glass glow rounded-2xl p-8 flex flex-col relative border-indigo-500/30">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="popular-badge">Best Value</span>
              </div>
              <div className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-4">Full Bundle</div>
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-zinc-600 line-through text-lg">$95</span>
                <span className="text-4xl font-extrabold text-white">$29</span>
              </div>
              <div className="savings-badge mb-4">Save 69% &mdash; Launch Price</div>
              <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                All 5 agent skills. One purchase. Limited time.
              </p>
              <ul className="space-y-3 mb-8 flex-1">
                {['Sales Outreach Agent', 'Content Pipeline Agent', 'Code Review Agent', 'Customer Support Agent', 'SEO Research Agent'].map((f, i) => (
                  <li key={i} className="text-zinc-300 text-sm flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleCheckout(bundlePriceId, 'bundle')}
                disabled={loading === 'bundle'}
                className="btn-primary flex items-center justify-center gap-2 w-full text-white font-semibold py-3.5 px-6 rounded-xl text-base disabled:opacity-50"
              >
                {loading === 'bundle' ? 'Loading...' : <>Get the Bundle <ArrowRight className="w-5 h-5" /></>}
              </button>
            </div>

            {/* Individual */}
            <div className="flex-1 glass rounded-2xl p-8 flex flex-col">
              <div className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-4">Individual</div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-extrabold text-white">$19</span>
                <span className="text-zinc-500 text-base">/each</span>
              </div>
              <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                Pick the specific skill you need.
              </p>
              <ul className="space-y-3 mb-8 flex-1">
                {['Any single skill', 'Full SKILL.md file', 'Config templates', 'Real-world examples', 'Troubleshooting guide'].map((f, i) => (
                  <li key={i} className="text-zinc-400 text-sm flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#skills"
                className="btn-secondary flex items-center justify-center gap-2 w-full text-indigo-300 font-semibold py-3 px-6 rounded-xl text-sm"
              >
                Browse Skills <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="max-w-4xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">How It Works</h2>
          <p className="text-zinc-500 text-center mb-14">From download to working agent in 60 seconds</p>
          <div className="flex items-start justify-center gap-4">
            <div className="flex-1 text-center">
              <div className="step-circle bg-gradient-to-br from-blue-500/15 to-blue-600/5 border border-blue-500/20">
                <Download className="w-7 h-7 text-blue-400" />
                <div className="step-num">1</div>
              </div>
              <h3 className="text-white font-semibold mb-2">Download</h3>
              <p className="text-zinc-500 text-sm">Get the SKILL.md file</p>
              <div className="mt-3 mx-auto max-w-[180px] bg-zinc-900/60 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-indigo-400 font-mono">
                skills.lucidstack.ai
              </div>
            </div>
            <div className="step-arrow">&#10230;</div>
            <div className="flex-1 text-center">
              <div className="step-circle bg-gradient-to-br from-purple-500/15 to-purple-600/5 border border-purple-500/20">
                <Package className="w-7 h-7 text-purple-400" />
                <div className="step-num">2</div>
              </div>
              <h3 className="text-white font-semibold mb-2">Drop In</h3>
              <p className="text-zinc-500 text-sm">Place in your workspace</p>
              <div className="mt-3 mx-auto max-w-[180px] bg-zinc-900/60 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-indigo-400 font-mono">
                cp SKILL.md ~/.claude/
              </div>
            </div>
            <div className="step-arrow">&#10230;</div>
            <div className="flex-1 text-center">
              <div className="step-circle bg-gradient-to-br from-emerald-500/15 to-emerald-600/5 border border-emerald-500/20">
                <Zap className="w-7 h-7 text-emerald-400" />
                <div className="step-num">3</div>
              </div>
              <h3 className="text-white font-semibold mb-2">Use It</h3>
              <p className="text-zinc-500 text-sm">Claude becomes that agent</p>
              <div className="mt-3 mx-auto max-w-[180px] bg-zinc-900/60 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-indigo-400 font-mono">
                &quot;Research leads for...&quot;
              </div>
            </div>
          </div>
        </section>

        {/* Skills Grid */}
        <section id="skills" className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">5 Production-Ready Skills</h2>
          <p className="text-zinc-500 text-center mb-14">Each built following Anthropic&apos;s official skill guide</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill) => {
              const IconComponent = skill.Icon
              return (
                <div key={skill.name} className="glass glass-hover rounded-2xl p-7 flex flex-col transition-all duration-300">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`skill-icon ${skill.iconBg}`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-base">{skill.name}</h3>
                      {skill.free && <span className="free-badge mt-1">FREE SAMPLE</span>}
                    </div>
                  </div>
                  <p className="text-zinc-400 text-sm mb-5 leading-relaxed">{skill.description}</p>
                  <ul className="space-y-2.5 mb-7 flex-1">
                    {skill.features.map((f, i) => (
                      <li key={i} className="text-zinc-500 text-sm flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  {skill.free ? (
                    <a
                      href="/downloads/seo-research-agent-free.zip"
                      className="btn-green flex items-center justify-center gap-2 w-full text-white font-medium py-2.5 px-4 rounded-xl text-sm"
                    >
                      <Download className="w-4 h-4" /> Download Free
                    </a>
                  ) : (
                    <button
                      onClick={() => handleCheckout(skill.priceId, skill.name)}
                      disabled={loading === skill.name}
                      className="btn-secondary flex items-center justify-center gap-2 w-full text-indigo-300 font-medium py-2.5 px-4 rounded-xl text-sm disabled:opacity-50"
                    >
                      {loading === skill.name ? 'Loading...' : '$19 — Buy Skill'}
                    </button>
                  )}
                </div>
              )
            })}

            {/* Bundle card in grid */}
            <div className="glass glow rounded-2xl p-7 flex flex-col border-indigo-500/25">
              <div className="flex items-start gap-4 mb-4">
                <div className="skill-icon bg-gradient-to-br from-indigo-500/25 to-purple-600/10 border border-indigo-500/30">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-base">Full Bundle</h3>
                  <span className="popular-badge mt-1" style={{fontSize: '9px', padding: '2px 8px'}}>BEST VALUE</span>
                </div>
              </div>
              <p className="text-zinc-400 text-sm mb-5 leading-relaxed">All 5 skills at one price. Save 69%.</p>
              <ul className="space-y-2.5 mb-7 flex-1">
                {['Sales Outreach', 'Content Pipeline', 'Code Review', 'Customer Support', 'SEO Research'].map((f, i) => (
                  <li key={i} className="text-zinc-300 text-sm flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleCheckout(bundlePriceId, 'bundle')}
                disabled={loading === 'bundle'}
                className="btn-primary flex items-center justify-center gap-2 w-full text-white font-semibold py-3 px-4 rounded-xl text-sm disabled:opacity-50"
              >
                {loading === 'bundle' ? 'Loading...' : <>$29 — Get All 5 <ArrowRight className="w-4 h-4" /></>}
              </button>
            </div>
          </div>
        </section>

        {/* Code Preview */}
        <section className="max-w-4xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">What You Get</h2>
          <p className="text-zinc-500 text-center mb-14">Each skill is a single SKILL.md file — here&apos;s what&apos;s inside</p>
          <div className="glass rounded-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3.5 bg-zinc-900/50 border-b border-zinc-800/50">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              <span className="text-zinc-600 text-xs font-mono ml-3">sales-outreach-agent/SKILL.md</span>
            </div>
            <div className="p-6 font-mono text-sm leading-relaxed">
              <div className="text-zinc-600">---</div>
              <div><span className="text-pink-400">name</span><span className="text-zinc-600">:</span> <span className="text-emerald-400">sales-outreach-agent</span></div>
              <div><span className="text-pink-400">description</span><span className="text-zinc-600">:</span> <span className="text-emerald-400">Automate lead research, personalized</span></div>
              <div><span className="text-emerald-400">  outreach emails, and follow-up sequences...</span></div>
              <div className="text-zinc-600">---</div>
              <div className="mt-3"><span className="text-purple-400 font-bold"># Sales Outreach Agent</span></div>
              <div className="mt-2 text-zinc-500">You are a specialized sales development agent.</div>
              <div className="text-zinc-500">Research leads, craft personalized emails, and</div>
              <div className="text-zinc-500">manage multi-touch follow-up sequences.</div>
              <div className="mt-3"><span className="text-purple-400 font-bold">## Workflows</span></div>
              <div className="text-blue-400">  - Lead Research &amp; Qualification</div>
              <div className="text-blue-400">  - Personalized Email Drafting</div>
              <div className="text-blue-400">  - Follow-up Sequence Management</div>
              <div className="text-blue-400">  - Response Analysis &amp; Objection Handling</div>
              <div className="mt-3"><span className="text-purple-400 font-bold">## Examples</span></div>
              <div className="text-zinc-600 italic">  # 3 real-world usage examples included...</div>
              <div className="mt-3"><span className="text-purple-400 font-bold">## Troubleshooting</span></div>
              <div className="text-zinc-600 italic">  # Common issues and fixes...</div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">FAQ</h2>
          <p className="text-zinc-500 text-center mb-14">Everything you need to know</p>
          <div className="space-y-4">
            {[
              { q: 'What exactly is a SKILL.md file?', a: 'A structured markdown file that gives your AI agent specialized instructions for a specific task. Think of it as a job description for your agent — it tells Claude exactly how to handle specific workflows, with examples and edge cases built in.' },
              { q: 'What do I need to use these?', a: 'Claude Code, OpenClaw, or any AI agent system that supports SKILL.md-based skills. No special software, API keys, or infrastructure required.' },
              { q: 'Can I customize them?', a: 'Absolutely. They\'re plain markdown files. Edit them to match your workflow, industry terminology, and preferences. That\'s the whole point — they\'re designed to be a starting point you make your own.' },
              { q: 'How are these different from a ChatGPT prompt?', a: 'Skills are persistent — Claude loads them automatically every session. They include structured workflows, trigger phrases for auto-activation, real-world examples, config templates, and troubleshooting. It\'s like the difference between giving someone verbal instructions vs. giving them a training manual.' },
              { q: 'Is there a refund policy?', a: 'Digital products are non-refundable, but try the free SEO Research Agent first — it\'s the full product, not a demo. If that works for you, you\'ll love the rest.' },
            ].map((item, i) => (
              <div key={i} className="glass glass-hover rounded-xl p-6 transition-all duration-300">
                <h3 className="text-white font-semibold mb-2">{item.q}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="max-w-3xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to level up your agents?</h2>
          <p className="text-zinc-400 mb-8 text-lg">Start with the free sample. Upgrade when you&apos;re convinced.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/downloads/seo-research-agent-free.zip"
              className="btn-green flex items-center justify-center gap-2 text-white font-semibold py-3.5 px-8 rounded-xl"
            >
              <Download className="w-5 h-5" /> Download Free Sample
            </a>
            <button
              onClick={() => handleCheckout(bundlePriceId, 'bundle-bottom')}
              disabled={loading === 'bundle-bottom'}
              className="btn-primary flex items-center justify-center gap-2 text-white font-semibold py-3.5 px-8 rounded-xl disabled:opacity-50"
            >
              {loading === 'bundle-bottom' ? 'Loading...' : <>Get All 5 for $29 <ArrowRight className="w-5 h-5" /></>}
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-zinc-800/30 py-10 text-center">
          <p className="text-zinc-600 text-sm">© 2026 LucidStack.ai LLC</p>
          <p className="mt-2">
            <a href="mailto:support@lucidstack.ai" className="text-indigo-400/60 hover:text-indigo-400 text-sm transition-colors">
              support@lucidstack.ai
            </a>
          </p>
        </footer>
      </main>
    </>
  )
}
