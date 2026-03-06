import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'

const DOWNLOAD_HASH = '1bbb62891b997ef4'

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY)
}

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const sessionId = searchParams.get('session_id')

  if (!sessionId) {
    return NextResponse.json({ error: 'Missing session_id' }, { status: 400 })
  }

  try {
    const stripe = getStripe()
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    // Verify payment was successful
    if (session.payment_status !== 'paid') {
      return NextResponse.json({ error: 'Payment not completed' }, { status: 403 })
    }

    // Serve the file
    const filePath = join(process.cwd(), 'public', 'downloads', `${DOWNLOAD_HASH}.zip`)
    const fileBuffer = readFileSync(filePath)

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename="agent-skill-packs-v1.zip"',
        'Content-Length': fileBuffer.length.toString(),
      },
    })
  } catch (err) {
    console.error('Download error:', err)
    return NextResponse.json({ error: 'Invalid or expired download link' }, { status: 403 })
  }
}
