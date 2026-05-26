"use client"

import { useState, FormEvent } from "react"
import { Eye, EyeOff } from "lucide-react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { firebaseAuth } from "@/lib/firebase-client"
import { useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Image from "next/image"

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const searchParams = useSearchParams()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const credential = await signInWithEmailAndPassword(firebaseAuth, email, password)
      const idToken = await credential.user.getIdToken()

      const res = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { Authorization: `Bearer ${idToken}` },
      })

      if (!res.ok) throw new Error()

      const callbackUrl = searchParams.get("callbackUrl")
      const destination =
        callbackUrl && callbackUrl.startsWith("/") ? callbackUrl : "/projetos/dashboard-wri-brasil"
      window.location.assign(destination)
    } catch {
      setError("Email ou senha incorretos. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 rounded-none">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* Coluna esquerda — formulário */}
          <form onSubmit={handleSubmit} className="p-8 md:p-12">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Acesso restrito</h1>
                <p className="text-sm text-muted-foreground text-balance">
                  Informe suas credenciais para continuar
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-medium leading-none">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-none"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="password" className="text-sm font-medium leading-none">
                    Senha
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="rounded-none pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <p className="text-sm text-destructive text-center">{error}</p>
                )}

                <Button type="submit" className="w-full rounded-none" disabled={loading}>
                  {loading ? "Entrando..." : "Entrar"}
                </Button>
              </div>
            </div>
          </form>

          {/* Coluna direita — imagem/identidade visual */}
          <div className="relative hidden md:flex flex-col items-center justify-center gap-6 bg-[#1a2340] p-12 min-h-[480px]">
            <Image
              src="/logo-branco.png"
              alt="Logo"
              width={360}
              height={120}
              className="object-contain"
            />
            <p className="text-white/80 text-sm text-left leading-relaxed max-w-xs">
              Painel Qualionibus - Sistema de monitoramento e análise de dados de transporte público
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
