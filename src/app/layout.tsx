import ClarityInit from "@/components/clarity-init";
import { ConditionalFooter } from "@/components/conditional-footer";
import { Toaster } from "@/components/ui/sonner";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  fallback: ["Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Observatório",
  description: "Sistema de monitoramento e análise de dados",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.className}>
      <head>
        <GoogleAnalytics
          gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ""}
          debugMode={process.env.NODE_ENV === "development"}
        />
        <ClarityInit />
      </head>
      <body className="antialiased">
        <main className="">{children}</main>
        <Toaster />
        <ConditionalFooter />
      </body>
    </html>
  );
}
