import React from "react";
import type { Metadata } from "next";
import PngConverterClient from "@/components/PngConverterClient";

export const metadata: Metadata = {
  title: "Como Converter PNG para WebP Grátis Online - CoreTools Utilities",
  description:
    "Converta imagens PNG para WebP em lote instantaneamente. Processamento 100% local no navegador para máxima segurança e privacidade. Ideal para otimização de sites.",
  keywords: [
    "converter png para webp",
    "png para webp online",
    "como converter png para webp no mac",
    "conversor webp gratuito",
  ],
};

export default function PngConverterPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Conversor WebP Inteligente CoreTools - PNG para WebP",
    "operatingSystem": "All",
    "applicationCategory": "UtilityApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
    },
    "featureList": [
      "Processamento 100% Client-Side",
      "Conversão adaptativa de qualidade de 75% a 85%",
      "Execução em Web Workers em lote",
      "Download unificado em arquivo ZIP",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PngConverterClient />
    </>
  );
}
