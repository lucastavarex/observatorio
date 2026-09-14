import { randomBytes } from "node:crypto"
import { getFirebaseAdminAuth } from "@/lib/firebase-admin"
import {
  classifyCsvRows,
  parseCsvRows,
  type DuplicateCsvRow,
  type InvalidCsvRow,
  type ValidCsvUser,
} from "@/lib/wri-emails/csv"

const RESET_DELAY_MS = 400

export type WriImportPreview = {
  generatedAt: string
  projectId: string
  counts: {
    csvRows: number
    uniqueValid: number
    invalid: number
    duplicateInCsv: number
    existing: number
    new: number
  }
  invalid: InvalidCsvRow[]
  duplicateInCsv: DuplicateCsvRow[]
  existing: ValidCsvUser[]
  new: ValidCsvUser[]
}

export type WriImportApplyResult = WriImportPreview & {
  created: ValidCsvUser[]
  failed: Array<ValidCsvUser & { error: string }>
}

async function listFirebaseEmails(): Promise<Set<string>> {
  const auth = getFirebaseAdminAuth()
  const emails = new Set<string>()
  let pageToken: string | undefined

  do {
    const result = await auth.listUsers(1000, pageToken)
    for (const user of result.users) {
      if (user.email) emails.add(user.email.toLowerCase())
    }
    pageToken = result.pageToken
  } while (pageToken)

  return emails
}

function randomPassword(): string {
  return randomBytes(24).toString("base64url")
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function sendPasswordResetEmail(email: string): Promise<void> {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY
  if (!apiKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_FIREBASE_API_KEY (needed to send reset emails)"
    )
  }

  const continueUrl =
    process.env.WRI_PASSWORD_RESET_CONTINUE_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    undefined

  const body: Record<string, string> = {
    requestType: "PASSWORD_RESET",
    email,
  }
  if (continueUrl) {
    body.continueUrl = continueUrl
  }

  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  )

  if (!res.ok) {
    const payload = await res.text()
    throw new Error(`Password reset email failed (${res.status}): ${payload}`)
  }
}

export async function previewWriEmailImport(
  csvText: string
): Promise<WriImportPreview> {
  const csvRows = parseCsvRows(csvText)
  const { invalid, duplicateInCsv, unique } = classifyCsvRows(csvRows)
  const existingEmails = await listFirebaseEmails()

  const existing: ValidCsvUser[] = []
  const toCreate: ValidCsvUser[] = []

  for (const row of unique) {
    if (existingEmails.has(row.email)) {
      existing.push(row)
    } else {
      toCreate.push(row)
    }
  }

  return {
    generatedAt: new Date().toISOString(),
    projectId: process.env.FIREBASE_PROJECT_ID ?? "",
    counts: {
      csvRows: csvRows.length,
      uniqueValid: unique.length,
      invalid: invalid.length,
      duplicateInCsv: duplicateInCsv.length,
      existing: existing.length,
      new: toCreate.length,
    },
    invalid,
    duplicateInCsv,
    existing,
    new: toCreate,
  }
}

export async function applyWriEmailImport(
  csvText: string
): Promise<WriImportApplyResult> {
  const preview = await previewWriEmailImport(csvText)
  const auth = getFirebaseAdminAuth()
  const created: ValidCsvUser[] = []
  const failed: Array<ValidCsvUser & { error: string }> = []

  for (const row of preview.new) {
    try {
      await auth.createUser({
        email: row.email,
        displayName: row.nome,
        password: randomPassword(),
        emailVerified: false,
        disabled: false,
      })
      await sendPasswordResetEmail(row.email)
      created.push(row)
      await sleep(RESET_DELAY_MS)
    } catch (err) {
      failed.push({
        ...row,
        error: err instanceof Error ? err.message : String(err),
      })
    }
  }

  return {
    ...preview,
    created,
    failed,
  }
}
