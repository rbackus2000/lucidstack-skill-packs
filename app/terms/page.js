export const metadata = {
  title: 'Terms of Service | LucidStack',
}

export default function Terms() {
  return (
    <main style={{ 
      background: '#0a0a0a', color: '#e0e0e0', minHeight: '100vh', 
      padding: '60px 20px', fontFamily: 'system-ui, sans-serif',
      maxWidth: '720px', margin: '0 auto', lineHeight: 1.7
    }}>
      <h1 style={{ color: '#fff', fontSize: '2rem', marginBottom: '2rem' }}>Terms of Service</h1>
      <p style={{ color: '#888', marginBottom: '2rem' }}>Last updated: March 15, 2026</p>
      
      <h2 style={{ color: '#fff', fontSize: '1.3rem', marginTop: '2rem' }}>1. Acceptance of Terms</h2>
      <p>By accessing and using LucidStack.ai products and services, you agree to be bound by these Terms of Service. If you do not agree, do not use our services.</p>
      
      <h2 style={{ color: '#fff', fontSize: '1.3rem', marginTop: '2rem' }}>2. Description of Services</h2>
      <p>LucidStack.ai provides AI-powered software development tools, agent skills, prompt libraries, educational content, and related digital products. Our services include but are not limited to downloadable skill packs, online courses, and SaaS platforms.</p>
      
      <h2 style={{ color: '#fff', fontSize: '1.3rem', marginTop: '2rem' }}>3. User Accounts</h2>
      <p>Some services may require account creation. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.</p>
      
      <h2 style={{ color: '#fff', fontSize: '1.3rem', marginTop: '2rem' }}>4. Purchases and Refunds</h2>
      <p>Digital products are sold as-is. Due to the nature of digital downloads, all sales are final. If you experience technical issues with a product, contact support@lucidstack.ai and we will work to resolve the issue.</p>
      
      <h2 style={{ color: '#fff', fontSize: '1.3rem', marginTop: '2rem' }}>5. Intellectual Property</h2>
      <p>All content, code, and materials provided through LucidStack.ai are owned by LucidStack.ai LLC. Purchased products are licensed for personal and commercial use by the purchaser only. Redistribution or resale of our products is prohibited.</p>
      
      <h2 style={{ color: '#fff', fontSize: '1.3rem', marginTop: '2rem' }}>6. Limitation of Liability</h2>
      <p>LucidStack.ai provides tools and educational content as-is. We are not liable for any damages arising from the use of our products. AI-generated outputs should be reviewed before use in production environments.</p>
      
      <h2 style={{ color: '#fff', fontSize: '1.3rem', marginTop: '2rem' }}>7. Contact</h2>
      <p>Questions about these terms? Email us at <a href="mailto:support@lucidstack.ai" style={{ color: '#00D65B' }}>support@lucidstack.ai</a></p>
    </main>
  )
}
