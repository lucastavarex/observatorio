import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { getTokens } from "next-firebase-auth-edge"
import { isAdminEmail } from "@/lib/admin"
import { FIREBASE_AUTH_CONFIG } from "@/lib/firebase-auth-config"

export type AdminAuthOk = {
  ok: true
  email: string
}

export type AdminAuthErr = {
  ok: false
  response: NextResponse
}

export async function requireAdmin(): Promise<AdminAuthOk | AdminAuthErr> {
  const tokens = await getTokens(await cookies(), FIREBASE_AUTH_CONFIG)

  if (!tokens) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Não autenticado." }, { status: 401 }),
    }
  }

  const email =
    typeof tokens.decodedToken.email === "string"
      ? tokens.decodedToken.email
      : null

  if (!isAdminEmail(email)) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Acesso negado." }, { status: 403 }),
    }
  }

  return { ok: true, email: email! }
}

export async function readCsvFromRequest(request: Request): Promise<string> {
  const contentType = request.headers.get("content-type") ?? ""

  if (contentType.includes("multipart/form-data")) {
    const form = await request.formData()
    const file = form.get("file")
    if (!(file instanceof File)) {
      throw new Error('Envie o CSV no campo "file".')
    }
    return await file.text()
  }

  if (contentType.includes("application/json")) {
    const body = (await request.json()) as { csv?: string }
    if (typeof body.csv !== "string" || !body.csv.trim()) {
      throw new Error('Envie o CSV no campo JSON "csv".')
    }
    return body.csv
  }

  const text = await request.text()
  if (!text.trim()) {
    throw new Error("Corpo da requisição vazio. Envie o CSV.")
  }
  return text
}
