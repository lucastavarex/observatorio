import { authMiddleware } from "next-firebase-auth-edge"
import { NextRequest, NextResponse } from "next/server"
import { FIREBASE_AUTH_CONFIG } from "@/lib/firebase-auth-config"

const PROTECTED_PATHS = ["/projetos/dashboard-wri-brasil"]

function isProtected(request: NextRequest) {
  return PROTECTED_PATHS.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  )
}

function buildCsp(nonce: string): string {
  const isDevelopment = process.env.NODE_ENV === "development"

  // 'strict-dynamic' faz browsers modernos ignorarem 'unsafe-inline' e confiarem
  // apenas em scripts carregados por scripts que já têm o nonce.
  // 'unsafe-inline' é mantido como fallback para browsers antigos (ignorado por CSP3).
  const scriptSrc = [
    `'nonce-${nonce}'`,
    "'strict-dynamic'",
    "'unsafe-inline'",
    "https:",
    ...(isDevelopment ? ["'unsafe-eval'"] : []),
  ].join(" ")

  return `
    default-src 'self' https://*.cloudinary.com https://*.sharepoint.com https://*.mapbox.com/ https://*.powerbi.com/ https://*.outlook.com/;
    script-src ${scriptSrc};
    connect-src 'self' https://*.googleapis.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://*.cloudinary.com https://*.sharepoint.com https://*.mapbox.com https://*.powerbi.com https://*.outlook.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self' data: https://storage.googleapis.com;
    media-src 'self' data: blob: https://*.cloudinary.com https://*.sharepoint.com;
    worker-src 'self' blob:;
    frame-src https://*.powerbi.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, " ").trim()
}

function applySecurityHeaders(response: NextResponse, nonce: string): NextResponse {
  response.headers.set("Content-Security-Policy", buildCsp(nonce))
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-XSS-Protection", "1; mode=block")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()")
  return response
}

export default async function middleware(request: NextRequest) {
  // Nonce único por request — Next.js lê x-nonce dos request headers
  // e injeta automaticamente em seus próprios scripts inline de hidratação.
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64")

  return authMiddleware(request, {
    loginPath: "/api/auth/login",
    logoutPath: "/api/auth/logout",
    ...FIREBASE_AUTH_CONFIG,
    handleValidToken: async (_tokens, headers) => {
      headers.set("x-nonce", nonce)
      const response = NextResponse.next({ request: { headers } })
      return applySecurityHeaders(response, nonce)
    },
    handleInvalidToken: async () => {
      if (isProtected(request)) {
        return NextResponse.redirect(new URL("/sign-in", request.url))
      }
      const requestHeaders = new Headers(request.headers)
      requestHeaders.set("x-nonce", nonce)
      const response = NextResponse.next({ request: { headers: requestHeaders } })
      return applySecurityHeaders(response, nonce)
    },
    handleError: async () => {
      if (isProtected(request)) {
        return NextResponse.redirect(new URL("/sign-in", request.url))
      }
      const requestHeaders = new Headers(request.headers)
      requestHeaders.set("x-nonce", nonce)
      const response = NextResponse.next({ request: { headers: requestHeaders } })
      return applySecurityHeaders(response, nonce)
    },
  })
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
}
