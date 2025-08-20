"use client"

import { useEffect, useState } from "react"

const SESSION_KEY = "home-loading-shown"

export function useHomeLoading() {
  // Initialize with loading state to prevent flicker
  const [shouldShowLoading, setShouldShowLoading] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    // Mark as hydrated
    setIsHydrated(true)
    
    // Check if loading has already been shown in this session
    const hasShownLoading = sessionStorage.getItem(SESSION_KEY)
    
    if (hasShownLoading) {
      setShouldShowLoading(false)
      setIsLoading(false)
    }
  }, [])

  const handleLoadingComplete = () => {
    // Mark loading as shown in session storage
    sessionStorage.setItem(SESSION_KEY, "true")
    setIsLoading(false)
    setShouldShowLoading(false)
  }

  return {
    shouldShowLoading: shouldShowLoading && isHydrated,
    isLoading,
    handleLoadingComplete
  }
}
