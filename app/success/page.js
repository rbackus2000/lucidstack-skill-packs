'use client'

export default function Success() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="glass glow rounded-2xl p-12 max-w-lg text-center">
        <div className="text-5xl mb-6">🎉</div>
        <h1 className="font-display text-3xl font-bold text-white mb-4">
          You're in.
        </h1>
        <p className="text-zinc-400 mb-6 leading-relaxed">
          Your Agent Skill Pack is on its way. Check your email for the download link.
        </p>
        <p className="text-sm text-zinc-500">
          Questions? Reach out at{' '}
          <a href="mailto:hello@lucidstack.ai" className="text-indigo-400 hover:text-indigo-300">
            hello@lucidstack.ai
          </a>
        </p>
      </div>
    </main>
  )
}
