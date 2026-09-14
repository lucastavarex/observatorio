import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getTokens } from "next-firebase-auth-edge"
import { isAdminEmail } from "@/lib/admin"
import { FIREBASE_AUTH_CONFIG } from "@/lib/firebase-auth-config"

export const runtime = "nodejs"

export async function GET() {
  const tokens = await getTokens(await cookies(), FIREBASE_AUTH_CONFIG)

  if (!tokens) {
    return NextResponse.json({ isAdmin: false }, { status: 401 })
  }

  const email =
    typeof tokens.decodedToken.email === "string"
      ? tokens.decodedToken.email
      : null

  return NextResponse.json({
    isAdmin: isAdminEmail(email),
    email,
  })
}
