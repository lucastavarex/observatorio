import { NextResponse } from "next/server"
import { previewWriEmailImport } from "@/lib/wri-emails/import"
import {
  readCsvFromRequest,
  requireAdmin,
} from "@/lib/wri-emails/require-admin"

export const runtime = "nodejs"

export async function POST(request: Request) {
  const auth = await requireAdmin()
  if (!auth.ok) return auth.response

  try {
    const csvText = await readCsvFromRequest(request)
    const report = await previewWriEmailImport(csvText)
    return NextResponse.json(report)
  } catch (err) {
    const message = err instanceof Error ? err.message : "Falha ao validar CSV."
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
