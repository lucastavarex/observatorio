"use client"

import { HomeContent } from "@/components/home-content"
import { HomeLoading } from "@/components/home-loading"
import { useHomeLoading } from "@/hooks/use-home-loading"
import { Suspense } from "react"

export default function Home() {
  const { shouldShowLoading, isLoading, handleLoadingComplete } = useHomeLoading()

  return (
    <>
      {/* Always render content in background to allow preloading */}
      <div className={shouldShowLoading || isLoading ? "hidden" : "block"}>
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
          <HomeContent />
        </Suspense>
      </div>
      
      {/* Show loading screen when needed */}
      {(shouldShowLoading || isLoading) && (
        <HomeLoading onLoadingComplete={handleLoadingComplete} />
      )}
    </>
  )
}
