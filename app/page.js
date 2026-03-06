'use client'

import { useState } from 'react'

const skills = [
  {
    name: 'Sales Outreach Agent',
    description: 'AI-powered lead research, personalized cold emails, and automated follow-up sequences. Your SDR that never sleeps.',
    features: ['Lead intelligence research', 'Personalized email drafting', 'Follow-up cadence management', 'Response analysis & objection handling'],
    icon: '🎯',
    priceId: 'price_1T7oGHAOEKxDDK6S9k28oHJw',
  },
  {
    name: 'Content Pipeline Agent',
    description: 'End-to-end content ops. Trend monitoring, multi-platform drafting, editorial calendar, and publishing workflows.',
    features: ['Industry trend monitoring', 'LinkedIn, X, blog, newsletter drafting', 'Editorial calendar management', 'Content repurposing engine'],
    icon: '📝',
    priceId: 'price_1T7oGHAOEKxDDK6Suij9kKUp',
  },
  {
    name: 'Code Review Agent',
    description: 'Senior-engineer-level code reviews on autopilot. Security audits, performance analysis, and pre-commit checks.',
    features: ['OWASP security scanning', 'Performance bottleneck detection', 'Pre-commit quality gates', 'Architecture review'],
    icon: '🔍',
    priceId: 'price_1T7oGHAOEKxDDK6StR48de1S',
  },
  {
    name: 'Customer Support Agent',
    description: 'AI tier-1 support that sounds human. Ticket triage, response drafting, KB management, and customer health tracking.',
    features: ['Intelligent ticket triage', 'Human-sounding response drafts', 'Auto-learning knowledge base', 'Customer health scoring'],
    icon: '💬',
    priceId: 'price_1T7oGHAOEKxDDK6S98yB0024',
  },
  {
    name: 'SEO Research Agent',
    description: 'Agency-quality SEO without the agency. Keyword research, competitor analysis, content briefs, and technical audits.',
    features: ['Keyword cluster research', 'Competitor gap analysis', 'On-page SEO audits', 'SEO content brief generation'],
    icon: '📊',
    priceId: 'price_1T7oGIAOEKxDDK6SD9zglTOh',
  },
]

const bundlePriceId = 'price_1T7oGGAOEKxDDK6S3nDfyWQa'

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
      const { url } = await res.json()
      window.location.href = url
    } catch (err) {
      alert('Something went wrong. Please try again.')
      setLoading(null)
    }
  }

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-24 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 to-transparent" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-indigo-400 mb-4">
            LucidStack.ai
          </p>
          <h1 className="font-display text-5xl sm:text-7xl font-bold tracking-tight mb-6">
            <span className="gradient-text">Agent Skill Packs</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Production-ready AI agent skills for Claude Code and OpenClaw.
            Drop them in, watch them work. Built by builders, for builders.
          </p>

          {/* Bundle CTA */}
          <div className="glass glow rounded-2xl p-8 max-w-lg mx-auto mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">Full Bundle — All 5 Skills</h3>
                <p className="text-sm text-zinc-400">Save $46 vs buying individually</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-white">$49</p>
                <p className="text-sm text-zinc-500 line-through">$95</p>
              </div>
            </div>
            <button
              onClick={() => handleCheckout(bundlePriceId, 'bundle')}
              disabled={loading === 'bundle'}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 disabled:opacity-50"
            >
              {loading === 'bundle' ? 'Redirecting...' : 'Get the Bundle →'}
            </button>
          </div>
          <p className="text-sm text-zinc-500">30-day money-back guarantee. Instant download.</p>
        </div>
      </section>

      {/* Individual Skills */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-bold text-center mb-4">
            Or pick what you need
          </h2>
          <p className="text-zinc-400 text-center mb-12 max-w-xl mx-auto">
            Each skill is a complete, self-contained agent module. Install in under 60 seconds.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <div key={skill.name} className="glass rounded-2xl p-6 flex flex-col">
                <div className="text-3xl mb-3">{skill.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{skill.name}</h3>
                <p className="text-sm text-zinc-400 mb-4 flex-grow">{skill.description}</p>
                <ul className="text-sm text-zinc-500 mb-6 space-y-1.5">
                  {skill.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="text-indigo-400 mt-0.5">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-2xl font-bold text-white">$19</span>
                  <button
                    onClick={() => handleCheckout(skill.priceId, skill.name)}
                    disabled={loading === skill.name}
                    className="bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-medium py-2 px-5 rounded-lg transition-all duration-200 border border-zinc-700 disabled:opacity-50"
                  >
                    {loading === skill.name ? 'Redirecting...' : 'Buy →'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-3xl font-bold text-center mb-12">
            How it works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Download', desc: 'Get your skill pack as a clean .zip file. Instant delivery after purchase.' },
              { step: '02', title: 'Drop In', desc: 'Copy the skill folder into your workspace skills/ directory. That\'s it.' },
              { step: '03', title: 'Watch It Work', desc: 'Your agent automatically detects and uses the skill when relevant tasks arise.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="text-5xl font-bold text-indigo-600/30 mb-3">{item.step}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display text-3xl font-bold text-center mb-12">
            Questions
          </h2>
          {[
            { q: 'What are Agent Skills?', a: 'Agent Skills are structured instruction files (SKILL.md) that give AI agents like Claude Code specialized capabilities. Think of them as plug-and-play expertise modules — drop one in and your agent gains a new superpower.' },
            { q: 'What do I need to use these?', a: 'Claude Code CLI or an OpenClaw gateway. The skills work with any setup that reads SKILL.md files from a workspace directory.' },
            { q: 'Can I customize the skills?', a: 'Absolutely. Every skill is a text file — modify the prompts, workflows, and configurations to match your exact use case. That\'s the point.' },
            { q: 'What if it\'s not for me?', a: '30-day money-back guarantee, no questions asked. Email hello@lucidstack.ai and we\'ll refund you immediately.' },
            { q: 'Do you offer team licenses?', a: 'Yes. Contact hello@lucidstack.ai for multi-seat pricing.' },
          ].map((item) => (
            <div key={item.q} className="border-b border-zinc-800 py-5">
              <h3 className="text-base font-semibold text-white mb-2">{item.q}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 text-center text-sm text-zinc-600">
        <p>© 2026 LucidStack.ai LLC. All rights reserved.</p>
        <p className="mt-1">Built with AI. Sold for builders.</p>
      </footer>
    </main>
  )
}
