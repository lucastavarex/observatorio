import { ConditionalFooter } from "@/components/conditional-footer";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { headers } from 'next/headers';
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    // Note: Nonce is generated in middleware but not enforced in current CSP policy
  const nonce = (await headers()).get('x-nonce') ?? undefined
  return (
    <html lang="pt-BR" className={inter.className}>
      <body className="antialiased">
        <main className="">{children}</main>
        <Toaster />
        <ConditionalFooter />
      </body>
    </html>
  );
}
