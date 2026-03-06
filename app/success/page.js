'use client'

import { useEffect, useState } from 'react'

export default function Success() {
  const [status, setStatus] = useState('verifying')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const sessionId = params.get('session_id')

    if (sessionId) {
      // Auto-trigger download
      setStatus('downloading')
      window.location.href = `/api/download?session_id=${sessionId}`
      
      // Update status after a moment
      setTimeout(() => setStatus('complete'), 3000)
    } else {
      setStatus('complete')
    }
  }, [])

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="glass glow rounded-2xl p-12 max-w-lg text-center">
        <div className="text-5xl mb-6">🎉</div>
        <h1 className="font-display text-3xl font-bold text-white mb-4">
          You're in.
        </h1>
        {status === 'verifying' && (
          <p className="text-zinc-400 mb-6">Verifying your purchase...</p>
        )}
        {status === 'downloading' && (
          <p className="text-zinc-400 mb-6">
            Your download should start automatically. If it doesn't,{' '}
            <a
              href={`/api/download?session_id=${new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '').get('session_id')}`}
              className="text-indigo-400 hover:text-indigo-300 underline"
            >
              click here
            </a>.
          </p>
        )}
        {status === 'complete' && (
          <p className="text-zinc-400 mb-6 leading-relaxed">
            Your Agent Skill Packs are downloaded. We also sent a backup download link to your email.
          </p>
        )}
        <div className="glass rounded-xl p-4 mb-6">
          <p className="text-sm text-zinc-300 font-medium mb-2">Quick Start:</p>
          <p className="text-sm text-zinc-400 font-mono">
            Unzip → copy skill folders to your workspace <code className="text-indigo-400">skills/</code> directory → done.
          </p>
        </div>
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
