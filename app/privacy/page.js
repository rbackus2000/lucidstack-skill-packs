export const metadata = {
  title: 'Privacy Policy | LucidStack',
}

export default function Privacy() {
  return (
    <main style={{ 
      background: '#0a0a0a', color: '#e0e0e0', minHeight: '100vh', 
      padding: '60px 20px', fontFamily: 'system-ui, sans-serif',
      maxWidth: '720px', margin: '0 auto', lineHeight: 1.7
    }}>
      <h1 style={{ color: '#fff', fontSize: '2rem', marginBottom: '2rem' }}>Privacy Policy</h1>
      <p style={{ color: '#888', marginBottom: '2rem' }}>Last updated: March 15, 2026</p>
      
      <h2 style={{ color: '#fff', fontSize: '1.3rem', marginTop: '2rem' }}>1. Information We Collect</h2>
      <p>We collect information you provide directly: email address (for purchases and account creation), payment information (processed securely via Stripe), and usage data to improve our services.</p>
      
      <h2 style={{ color: '#fff', fontSize: '1.3rem', marginTop: '2rem' }}>2. How We Use Your Information</h2>
      <p>We use your information to: process purchases and deliver digital products, provide customer support, improve our products and services, and send product updates (with your consent).</p>
      
      <h2 style={{ color: '#fff', fontSize: '1.3rem', marginTop: '2rem' }}>3. Third-Party Services</h2>
      <p>We use the following third-party services:</p>
      <ul style={{ paddingLeft: '20px' }}>
        <li><strong>Stripe</strong> — Payment processing. See <a href="https://stripe.com/privacy" style={{ color: '#00D65B' }}>Stripe&apos;s Privacy Policy</a></li>
        <li><strong>Vercel</strong> — Website hosting</li>
        <li><strong>TikTok</strong> — Content distribution (via TikTok Content Posting API)</li>
      </ul>
      
      <h2 style={{ color: '#fff', fontSize: '1.3rem', marginTop: '2rem' }}>4. TikTok Integration</h2>
      <p>Our application integrates with TikTok&apos;s Content Posting API to publish content. When you authorize our application with TikTok, we access your TikTok account to publish videos on your behalf. We store your TikTok access tokens securely and do not share them with third parties. You can revoke access at any time through your TikTok account settings.</p>
      
      <h2 style={{ color: '#fff', fontSize: '1.3rem', marginTop: '2rem' }}>5. Data Security</h2>
      <p>We implement industry-standard security measures to protect your information. Payment data is handled entirely by Stripe and never touches our servers. API credentials are encrypted at rest.</p>
      
      <h2 style={{ color: '#fff', fontSize: '1.3rem', marginTop: '2rem' }}>6. Data Retention</h2>
      <p>We retain your information for as long as your account is active or as needed to provide services. You can request deletion of your data by contacting us.</p>
      
      <h2 style={{ color: '#fff', fontSize: '1.3rem', marginTop: '2rem' }}>7. Your Rights</h2>
      <p>You have the right to: access your personal data, request correction or deletion, opt out of marketing communications, and revoke third-party authorizations.</p>
      
      <h2 style={{ color: '#fff', fontSize: '1.3rem', marginTop: '2rem' }}>8. Contact</h2>
      <p>Privacy questions? Email us at <a href="mailto:support@lucidstack.ai" style={{ color: '#00D65B' }}>support@lucidstack.ai</a></p>
    </main>
  )
}
