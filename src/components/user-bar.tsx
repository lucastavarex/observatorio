"use client"

import { useEffect, useState } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { firebaseAuth } from "@/lib/firebase-client"
import { LogOut, User } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export function UserBar() {
  const [displayName, setDisplayName] = useState<string | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    return onAuthStateChanged(firebaseAuth, (user) => {
      setDisplayName(user?.displayName ?? user?.email ?? null)
      setLoaded(true)
    })
  }, [])

  if (!loaded || !displayName) return null

  const handleSignOut = async () => {
    await signOut(firebaseAuth)
    await fetch("/api/auth/logout", { method: "POST" })
    window.location.href = "/sign-in"
  }

  const firstName = displayName.split(" ")[0]

  return (
    <div className="flex items-center justify-end pb-6">
      <Popover>
        <PopoverTrigger asChild>
          <button
            className="p-3 cursor-pointer transition-colors rounded-full bg-gray-100  text-gray-500 hover:text-black/50"
            aria-label="Menu do usuário"
          >
            <User className="h-5 w-5" />
          </button>
        </PopoverTrigger>

        <PopoverContent align="end" className="w-56 p-0 overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
            <p className="text-sm text-gray-700">
              Olá, <span className="font-semibold text-gray-900">{firstName}</span>!
            </p>
          </div>

          <button
            onClick={handleSignOut}
            className="flex items-center gap-2.5 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </button>
        </PopoverContent>
      </Popover>
    </div>
  )
}
