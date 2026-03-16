import Stripe from 'stripe'
import { NextResponse } from 'next/server'

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY)
}

export async function POST(req) {
  try {
    const { priceId } = await req.json()

    const stripe = getStripe()
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      automatic_tax: { enabled: true },
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Checkout error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
