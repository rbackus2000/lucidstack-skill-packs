import { NextResponse } from 'next/server'
import { writeFile, readFile, mkdir } from 'fs/promises'
import { join } from 'path'

// TikTok OAuth callback — exchanges auth code for access token
export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')
  const errorDescription = searchParams.get('error_description')

  if (error) {
    return new NextResponse(
      `<html><body style="background:#0a0a0a;color:#fff;font-family:system-ui;display:flex;align-items:center;justify-content:center;height:100vh;flex-direction:column">
        <h1 style="color:#ff4444">❌ TikTok Authorization Failed</h1>
        <p>${errorDescription || error}</p>
        <p style="color:#888;margin-top:20px">Close this window and try again.</p>
      </body></html>`,
      { headers: { 'Content-Type': 'text/html' } }
    )
  }

  if (!code) {
    return new NextResponse(
      `<html><body style="background:#0a0a0a;color:#fff;font-family:system-ui;display:flex;align-items:center;justify-content:center;height:100vh;flex-direction:column">
        <h1>❌ Missing authorization code</h1>
        <p style="color:#888">No code parameter received from TikTok.</p>
      </body></html>`,
      { headers: { 'Content-Type': 'text/html' } }
    )
  }

  try {
    // Exchange code for access token
    const tokenRes = await fetch('https://open.tiktokapis.com/v2/oauth/token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_key: process.env.TIKTOK_CLIENT_KEY,
        client_secret: process.env.TIKTOK_CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: `${process.env.NEXT_PUBLIC_URL}/api/tiktok/callback`,
      }),
    })

    const tokenData = await tokenRes.json()

    if (tokenData.error || !tokenData.access_token) {
      return new NextResponse(
        `<html><body style="background:#0a0a0a;color:#fff;font-family:system-ui;display:flex;align-items:center;justify-content:center;height:100vh;flex-direction:column">
          <h1 style="color:#ff4444">❌ Token Exchange Failed</h1>
          <pre style="color:#888;max-width:600px;overflow:auto">${JSON.stringify(tokenData, null, 2)}</pre>
        </body></html>`,
        { headers: { 'Content-Type': 'text/html' } }
      )
    }

    // Return the token data as JSON for the script to capture
    // In production, this would store in a database
    return new NextResponse(
      `<html><body style="background:#0a0a0a;color:#fff;font-family:system-ui;display:flex;align-items:center;justify-content:center;height:100vh;flex-direction:column">
        <h1 style="color:#00D65B">✅ TikTok Connected!</h1>
        <p>Copy this data and save it securely:</p>
        <pre id="token-data" style="background:#1a1a1a;padding:20px;border-radius:12px;max-width:600px;overflow:auto;font-size:13px;color:#00D65B">${JSON.stringify({
          access_token: tokenData.access_token,
          refresh_token: tokenData.refresh_token,
          expires_in: tokenData.expires_in,
          refresh_expires_in: tokenData.refresh_expires_in,
          open_id: tokenData.open_id,
          scope: tokenData.scope,
          token_type: tokenData.token_type,
          obtained_at: new Date().toISOString(),
        }, null, 2)}</pre>
        <button onclick="navigator.clipboard.writeText(document.getElementById('token-data').textContent)" 
          style="margin-top:16px;padding:10px 24px;background:#00D65B;color:#000;border:none;border-radius:8px;font-weight:600;cursor:pointer">
          Copy to Clipboard
        </button>
        <p style="color:#888;margin-top:20px">You can close this window now.</p>
      </body></html>`,
      { headers: { 'Content-Type': 'text/html' } }
    )
  } catch (err) {
    return new NextResponse(
      `<html><body style="background:#0a0a0a;color:#fff;font-family:system-ui;display:flex;align-items:center;justify-content:center;height:100vh;flex-direction:column">
        <h1 style="color:#ff4444">❌ Server Error</h1>
        <pre style="color:#888">${err.message}</pre>
      </body></html>`,
      { headers: { 'Content-Type': 'text/html' } }
    )
  }
}
