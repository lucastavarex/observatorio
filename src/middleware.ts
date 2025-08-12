import { NextRequest, NextResponse } from 'next/server'
 
export function middleware(request: NextRequest) {
   // Generate nonce for CSP
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')

  // Define CSP header with nonce support
  const isDevelopment = process.env.NODE_ENV === 'development'

  // SHA256 hashes for inline scripts
  const scriptHashes = [
    'sha256-UnthrFpGFotkvMOTp/ghVMSXoZZj9Y6epaMsaBAbUtg=',
    'sha256-TtbCxulSBIRcXKJGEUTNzReCryzD01lKLU4IQV8Ips0=',
    'sha256-QaDv8TLjywIM3mKcA73bK0btmqNpUfcuwzqZ4U9KTsk=',
  ]

  const scriptSrcDirectives = [
    "'self'",
    `'nonce-${nonce}'`,
    "'strict-dynamic'",
    ...scriptHashes.map(hash => `'${hash}'`),
    ...(isDevelopment ? ["'unsafe-eval'"] : []),
  ]
  const cspHeader = `
    default-src 'self';
    script-src ${scriptSrcDirectives.join(' ')};
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https:;
    font-src 'self' data: https:;
    media-src 'self' https:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`
  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, ' ')
    .trim()
 
  const requestHeaders = new Headers(request.headers)
 
  requestHeaders.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue
  )
 
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
  
  // Set security headers
  response.headers.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue
  )
  
  // X-Content-Type-Options: nosniff - Prevents MIME type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff')
  
  // X-Frame-Options: DENY - Prevents clickjacking attacks
  response.headers.set('X-Frame-Options', 'DENY')
  
  // X-XSS-Protection: 1; mode=block - Enables XSS protection
  response.headers.set('X-XSS-Protection', '1; mode=block')
  
  // Referrer-Policy: strict-origin-when-cross-origin - Controls referrer information
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  // Permissions-Policy - Restricts browser features
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=()'
  )
 
  return response
}