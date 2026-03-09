import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'

const DOWNLOAD_HASH = '1bbb62891b997ef4'

// Map price IDs to specific download files
const PRICE_TO_FILE = {
  'price_1T8sOa9TtKvyXKLaclSxAmUG': { file: 'premium-web-design.zip', name: 'premium-web-design-v1.zip' },
}

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

    // Check if this is a specific product purchase
    const lineItems = await stripe.checkout.sessions.listLineItems(sessionId)
    const priceId = lineItems.data?.[0]?.price?.id
    const specific = PRICE_TO_FILE[priceId]

    const filename = specific ? specific.file : `${DOWNLOAD_HASH}.zip`
    const downloadName = specific ? specific.name : 'agent-skill-packs-v1.zip'

    const filePath = join(process.cwd(), 'public', 'downloads', filename)
    const fileBuffer = readFileSync(filePath)

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${downloadName}"`,
        'Content-Length': fileBuffer.length.toString(),
      },
    })
  } catch (err) {
    console.error('Download error:', err)
    return NextResponse.json({ error: 'Invalid or expired download link' }, { status: 403 })
  }
}
