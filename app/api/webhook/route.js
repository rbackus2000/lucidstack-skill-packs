import Stripe from 'stripe'
import { NextResponse } from 'next/server'

const DOWNLOAD_HASH = '1bbb62891b997ef4'

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY)
}

export async function POST(req) {
  const stripe = getStripe()
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  let event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const customerEmail = session.customer_details?.email

    if (customerEmail) {
      // Send download email via Gmail API (Maton)
      try {
        const downloadUrl = `${process.env.NEXT_PUBLIC_URL}/api/download?session_id=${session.id}`
        
        const subject = 'Your Agent Skill Packs — Download Ready'
        const htmlBody = `
          <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0f; color: #e4e4e7; padding: 40px; border-radius: 16px;">
            <h1 style="color: #818cf8; font-size: 24px; margin-bottom: 8px;">Your Skill Packs are ready 🎉</h1>
            <p style="color: #a1a1aa; font-size: 16px; line-height: 1.6;">
              Thanks for your purchase! Click the button below to download your Agent Skill Packs.
            </p>
            <div style="text-align: center; margin: 32px 0;">
              <a href="${downloadUrl}" 
                 style="background: #4f46e5; color: white; padding: 14px 32px; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 16px; display: inline-block;">
                Download Your Skill Packs →
              </a>
            </div>
            <p style="color: #71717a; font-size: 14px; line-height: 1.5;">
              This link is unique to your purchase. If you have any questions, reply to this email or reach out at hello@lucidstack.ai.
            </p>
            <hr style="border: none; border-top: 1px solid #27272a; margin: 24px 0;" />
            <p style="color: #52525b; font-size: 12px;">
              © 2026 LucidStack.ai LLC — Built with AI, sold for builders.
            </p>
          </div>
        `

        // Construct the raw email
        const rawEmail = [
          `To: ${customerEmail}`,
          `From: LucidStack.ai <backus.agent@gmail.com>`,
          `Subject: ${subject}`,
          `MIME-Version: 1.0`,
          `Content-Type: text/html; charset=UTF-8`,
          ``,
          htmlBody,
        ].join('\r\n')

        const encodedEmail = Buffer.from(rawEmail)
          .toString('base64')
          .replace(/\+/g, '-')
          .replace(/\//g, '_')
          .replace(/=+$/, '')

        // Send via Gmail API (Maton gateway)
        const emailRes = await fetch(
          'https://gateway.maton.ai/google-mail/gmail/v1/users/me/messages/send',
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${process.env.MATON_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ raw: encodedEmail }),
          }
        )

        if (!emailRes.ok) {
          console.error('Email send failed:', await emailRes.text())
        } else {
          console.log(`Download email sent to ${customerEmail}`)
        }
      } catch (emailErr) {
        console.error('Email delivery error:', emailErr)
      }
    }
  }

  return NextResponse.json({ received: true })
}
