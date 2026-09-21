export const MAX_CSV_BYTES = 1_000_000
export const MAX_CSV_ROWS = 500

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type CsvRow = {
  line: number
  nome: string
  emailRaw: string
}

export type ValidCsvUser = {
  line: number
  nome: string
  email: string
}

export type InvalidCsvRow = {
  line: number
  nome: string
  email: string
  reason: "empty_email" | "multiple_or_malformed_email" | "invalid_email_format"
}

export type DuplicateCsvRow = {
  line: number
  nome: string
  email: string
  firstLine: number
  reason: "duplicate_in_csv"
}

/** Minimal CSV parser (handles quoted fields). */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let field = ""
  let inQuotes = false

  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    const next = text[i + 1]

    if (inQuotes) {
      if (ch === '"' && next === '"') {
        field += '"'
        i++
      } else if (ch === '"') {
        inQuotes = false
      } else {
        field += ch
      }
      continue
    }

    if (ch === '"') {
      inQuotes = true
    } else if (ch === ",") {
      row.push(field)
      field = ""
    } else if (ch === "\n") {
      row.push(field)
      rows.push(row)
      row = []
      field = ""
    } else if (ch === "\r") {
      // ignore CR (CRLF)
    } else {
      field += ch
    }
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field)
    rows.push(row)
  }

  return rows.filter((r) => r.some((cell) => String(cell).trim() !== ""))
}

function normalizeHeader(value: string): string {
  return String(value)
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "_")
}

export function parseCsvRows(text: string): CsvRow[] {
  if (text.length > MAX_CSV_BYTES) {
    throw new Error(
      `CSV muito grande (máx. ${Math.floor(MAX_CSV_BYTES / 1_000_000)} MB).`
    )
  }

  const table = parseCsv(text)
  if (table.length < 2) {
    throw new Error("CSV sem linhas de dados. Esperado cabeçalho nome,e_mail.")
  }

  const dataRowCount = table.length - 1
  if (dataRowCount > MAX_CSV_ROWS) {
    throw new Error(
      `CSV com ${dataRowCount} linhas (máx. ${MAX_CSV_ROWS}). Divida o arquivo.`
    )
  }

  const header = table[0].map(normalizeHeader)
  const nomeIdx = header.findIndex((h) => h === "nome")
  const emailIdx = header.findIndex(
    (h) => h === "e_mail" || h === "email" || h === "e-mail"
  )

  if (nomeIdx === -1 || emailIdx === -1) {
    throw new Error(
      `CSV deve ter colunas "nome" e "e_mail" (encontrado: ${header.join(", ")})`
    )
  }

  return table.slice(1).map((cols, i) => ({
    line: i + 2,
    nome: String(cols[nomeIdx] ?? "").trim(),
    emailRaw: String(cols[emailIdx] ?? "").trim(),
  }))
}

export function classifyCsvRows(rows: CsvRow[]): {
  invalid: InvalidCsvRow[]
  duplicateInCsv: DuplicateCsvRow[]
  unique: ValidCsvUser[]
} {
  const invalid: InvalidCsvRow[] = []
  const duplicateInCsv: DuplicateCsvRow[] = []
  const unique: ValidCsvUser[] = []
  const seen = new Map<string, number>()

  for (const row of rows) {
    const email = row.emailRaw.toLowerCase()

    if (!email || !EMAIL_RE.test(email) || /[;,\s]/.test(row.emailRaw)) {
      invalid.push({
        line: row.line,
        nome: row.nome,
        email: row.emailRaw,
        reason: !email
          ? "empty_email"
          : /[;,\s]/.test(row.emailRaw)
            ? "multiple_or_malformed_email"
            : "invalid_email_format",
      })
      continue
    }

    if (seen.has(email)) {
      duplicateInCsv.push({
        line: row.line,
        nome: row.nome,
        email,
        firstLine: seen.get(email)!,
        reason: "duplicate_in_csv",
      })
      continue
    }

    seen.set(email, row.line)
    unique.push({
      line: row.line,
      nome: row.nome || email,
      email,
    })
  }

  return { invalid, duplicateInCsv, unique }
}
