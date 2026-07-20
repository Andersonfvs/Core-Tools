import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://coretools.fvsynapse.com.br"),
  title: {
    default: "CoreTools // Utilitários Locais & Processamento no Navegador",
    template: "%s - CoreTools",
  },
  description: "Conversor inteligente de imagens WebP e descompactador ZIP/RAR local. Processamento rápido e seguro de dados de arquivos inteiramente no seu navegador.",
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "CoreTools // Utilitários Locais & Processamento no Navegador",
    description: "Conversor WebP e descompactador ZIP/RAR local. Ferramentas gratuitas com 100% de privacidade client-side.",
    url: "https://coretools.fvsynapse.com.br",
    siteName: "CoreTools Utilities",
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${plusJakarta.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-brand-bg text-brand-text flex flex-col selection:bg-brand-accent selection:text-black tech-dots">
        <div className="crt-overlay" />
        <Header />
        {children}
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
