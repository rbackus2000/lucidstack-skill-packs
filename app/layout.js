import './globals.css'

export const metadata = {
  title: 'Agent Skill Packs — LucidStack.ai',
  description: 'Production-ready AI agent skills for Claude Code and OpenClaw. Ship smarter with pre-built automation.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
