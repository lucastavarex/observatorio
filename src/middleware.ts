import { NextRequest, NextResponse } from 'next/server'
 
export function middleware(request: NextRequest) {
   // Generate nonce for CSP
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')


const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'sha256-7mu4H06fwDCjmnxxr/xNHyuQC6pLTHr4M2E4jXw5WZs=' sha256-OBTN3RiyCV4Bq7dFqZ5a2pAXjnCcCYeTJMO2I/LYKeo=' 'sha256-25aubIQ1kvlQreQddZtVehMuaDt/hwvVyUSnFYJhodc=' 'sha256-UMo+HuwdibWpoW79guh1683fKI4NaHCRgq3L1e0/MD4=' 'sha256-fuSPvaVke77gepl9bxwQy6N9SoBmfSqtI93mKQuGz38=' 'sha256-0lGV8bhdVVRzJizShtS5fHhAoG0WOKCB3OXk3ZmjotQ=' 'sha256-O/Zb2IObttmLvt2BIHfHf/PDcgVytp++NARgnIA6T7U=' 'sha256-OBTN3RiyCV4Bq7dFqZ5a2pAXjnCcCYeTJMO2I/LYKeo=' 'sha256-hk2h9ScTaFPUiEBQ6hkagOb5gl1z4fObk8Bg0EK1mA4=' 'sha256-iIKcowsDoBCz5vbaEJ3cR+uRDF/oyzr6axmrDaEryj4=' 'sha256-izUAK8Y1Yscl4cSFelC7TI7GmMSxJl6hH5F/0XtaXec=' 'sha256-rUWUvfyJIe4vN0CU3oLrQsdJp0lN07SbsTKRJrUXUTM=' 'sha256-i8XQ4QkN89gbsObaUjyU8JZ73YHKpWHeXm8HjYFRP3s=' 'sha256-zTEjrWdEzarrAzh0tKixbXYtw5kt4jWLSop/I6Ctoyg=' 'sha256-LcsuUMiDkprrt6ZKeiLP4iYNhWo8NqaSbAgtoZxVK3s=' 'sha256-GGib7dmv0//l3rlZhE6qn/NuAU+m3QRmszraN+jYPIk=' 'sha256-jxpmuzEyvVmGf1uu3rLnVb++ac4Q0kh49VFIlwUf6Q0=' 'sha256-8ZXtkgsEt8ROa6HNKzMIxGRJsLMrvWxztuj0stlphD4=';
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
 requestHeaders.set('x-nonce', nonce)
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