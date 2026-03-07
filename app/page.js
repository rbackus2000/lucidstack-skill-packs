'use client'

import { useState } from 'react'
import { Target, FileText, Search, MessageSquare, BarChart3, Package, ArrowRight, Check, Zap, Download } from 'lucide-react'

const skills = [
  {
    name: 'Sales Outreach Agent',
    description: 'AI-powered lead research, personalized cold emails, and automated follow-up sequences. Your SDR that never sleeps.',
    features: ['Lead intelligence research', 'Personalized email drafting', 'Follow-up cadence management', 'Response analysis & objection handling'],
    Icon: Target,
    color: 'text-red-400',
    borderColor: 'hover:border-red-500/30',
    priceId: 'price_1T8MVl9TtKvyXKLaZRvFOCfW',
  },
  {
    name: 'Content Pipeline Agent',
    description: 'End-to-end content ops. Trend monitoring, multi-platform drafting, editorial calendar, and publishing workflows.',
    features: ['Industry trend monitoring', 'LinkedIn, X, blog, newsletter drafting', 'Editorial calendar management', 'Content repurposing engine'],
    Icon: FileText,
    color: 'text-blue-400',
    borderColor: 'hover:border-blue-500/30',
    priceId: 'price_1T8MVl9TtKvyXKLaOv4t1GuG',
  },
  {
    name: 'Code Review Agent',
    description: 'Senior-engineer-level code reviews on autopilot. Security audits, performance analysis, and pre-commit checks.',
    features: ['OWASP security scanning', 'Performance bottleneck detection', 'Pre-commit quality gates', 'Architecture review'],
    Icon: Search,
    color: 'text-emerald-400',
    borderColor: 'hover:border-emerald-500/30',
    priceId: 'price_1T8MVl9TtKvyXKLaW8xQtz2j',
  },
  {
    name: 'Customer Support Agent',
    description: 'AI tier-1 support that sounds human. Ticket triage, response drafting, KB management, and customer health tracking.',
    features: ['Intelligent ticket triage', 'Human-sounding response drafts', 'Auto-learning knowledge base', 'Customer health scoring'],
    Icon: MessageSquare,
    color: 'text-violet-400',
    borderColor: 'hover:border-violet-500/30',
    priceId: 'price_1T8MVm9TtKvyXKLaHYUsf7lK',
  },
  {
    name: 'SEO Research Agent',
    description: 'Agency-quality SEO without the agency. Keyword research, competitor analysis, content briefs, and technical audits.',
    features: ['Keyword cluster research', 'Competitor gap analysis', 'On-page SEO audits', 'SEO content brief generation'],
    Icon: BarChart3,
    color: 'text-amber-400',
    borderColor: 'hover:border-amber-500/30',
    priceId: 'price_1T8MVm9TtKvyXKLaBW90KqF7',
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
    <main className="min-h-screen">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-indigo-400 text-sm font-medium mb-8">
          <Zap className="w-4 h-4" />
          Production-Ready Agent Skills
        </div>
        <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Agent Skill Packs
        </h1>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-6 leading-relaxed">
          Drop-in SKILL.md files that turn Claude Code from a generic assistant 
          into a specialist. Sales, content, code review, support, SEO — ready in seconds.
        </p>
        <p className="text-sm text-zinc-600 mb-12">
          Compatible with Claude Code, OpenClaw, and any SKILL.md-based agent system.
        </p>

        {/* Free Sample */}
        <div className="glass rounded-2xl p-6 max-w-lg mx-auto mb-6 border border-emerald-500/20">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Download className="w-5 h-5 text-emerald-400" />
              <div className="text-left">
                <h3 className="text-base font-semibold text-white">Free Sample — SEO Research Agent</h3>
                <p className="text-sm text-zinc-500">Try before you buy. Full skill, no strings.</p>
              </div>
            </div>
            <span className="text-lg font-bold text-emerald-400">FREE</span>
          </div>
          <a
            href="/downloads/seo-research-agent-free.zip"
            className="flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 px-6 rounded-xl transition-all duration-200"
          >
            Download Free Sample <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Bundle CTA */}
        <div className="glass glow rounded-2xl p-8 max-w-lg mx-auto mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Package className="w-6 h-6 text-indigo-400" />
              <div className="text-left">
                <h3 className="text-lg font-semibold text-white">Full Bundle — All 5 Skills</h3>
                <p className="text-sm text-zinc-400">Launch price — limited time</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-white">$29</p>
              <p className="text-sm text-zinc-500 line-through">$95</p>
            </div>
          </div>
          <button
            onClick={() => handleCheckout(bundlePriceId, 'bundle')}
            disabled={loading === 'bundle'}
            className="flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 text-lg"
          >
            {loading === 'bundle' ? 'Loading...' : <>Get the Bundle <ArrowRight className="w-5 h-5" /></>}
          </button>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <h2 className="font-display text-3xl font-bold text-white mb-10 text-center">
          Individual Skills
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill) => {
            const IconComponent = skill.Icon
            return (
              <div key={skill.name} className={`glass rounded-2xl p-6 ${skill.borderColor} transition-all duration-300 flex flex-col`}>
                <div className="flex items-center gap-3 mb-3">
                  <IconComponent className={`w-6 h-6 ${skill.color}`} />
                  <h3 className="text-white font-semibold">{skill.name}</h3>
                </div>
                <p className="text-zinc-400 text-sm mb-4 leading-relaxed">{skill.description}</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {skill.features.map((f, i) => (
                    <li key={i} className="text-zinc-500 text-sm flex items-start gap-2">
                      <Check className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleCheckout(skill.priceId, skill.name)}
                  disabled={loading === skill.name}
                  className="w-full bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 text-white font-medium py-2.5 px-4 rounded-xl transition-all duration-200 text-sm"
                >
                  {loading === skill.name ? 'Loading...' : '$19 — Buy Individual'}
                </button>
              </div>
            )
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="font-display text-3xl font-bold text-white mb-10 text-center">
          How it works
        </h2>
        <div className="grid grid-cols-3 gap-6">
          {[
            { step: '01', title: 'Download', desc: 'Get the skill pack zip file' },
            { step: '02', title: 'Drop in', desc: 'Copy to your skills/ directory' },
            { step: '03', title: 'Done', desc: 'Your agent auto-detects it' },
          ].map((s) => (
            <div key={s.step} className="text-center">
              <div className="text-2xl font-bold text-indigo-400 font-mono mb-2">{s.step}</div>
              <h3 className="text-white font-semibold text-sm mb-1">{s.title}</h3>
              <p className="text-zinc-500 text-xs">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-2xl mx-auto px-6 py-16">
        <h2 className="font-display text-3xl font-bold text-white mb-8 text-center">FAQ</h2>
        <div className="space-y-4">
          {[
            { q: 'What exactly is a SKILL.md file?', a: 'A structured markdown file that gives your AI agent specialized instructions for a specific task. Think of it as a job description for your agent.' },
            { q: 'What do I need to use these?', a: 'Claude Code, OpenClaw, or any AI agent system that supports SKILL.md-based skills. No special software required.' },
            { q: 'Can I customize them?', a: 'Absolutely. They are plain markdown files. Edit them to match your workflow, industry, and preferences.' },
            { q: 'Is there a team license?', a: 'Not yet, but we are working on it. For now, each purchase is for individual use. Contact support@lucidstack.ai for volume needs.' },
          ].map((item, i) => (
            <div key={i} className="glass rounded-xl p-5">
              <h3 className="text-white font-medium mb-2 text-sm">{item.q}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800/50 py-8 text-center text-zinc-600 text-sm">
        <p>© 2026 LucidStack.ai LLC</p>
        <p className="mt-1">
          <a href="mailto:support@lucidstack.ai" className="text-indigo-400 hover:text-indigo-300">support@lucidstack.ai</a>
        </p>
      </footer>
    </main>
  )
}
