import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { headers } from 'next/headers';
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
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
    <html lang="pt-BR" className={plusJakartaSans.className}>
      <body className="antialiased" nonce={nonce}>
        <main className="">{children}</main>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
