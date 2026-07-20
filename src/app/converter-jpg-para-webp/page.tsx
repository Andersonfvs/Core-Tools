import React from "react";
import type { Metadata } from "next";
import JpgConverterClient from "@/components/JpgConverterClient";

export const metadata: Metadata = {
  title: "Converter JPG para WebP Grátis Online - Antigravity Utilities",
  description:
    "Comprima e converta imagens JPG ou JPEG para formato WebP inteligente 100% no seu navegador. Otimização de SEO, velocidade e redução de até 80% do tamanho.",
  keywords: [
    "converter jpg para webp",
    "jpg para webp online",
    "como converter jpeg para webp",
    "otimizar imagens jpeg webp",
  ],
};

export default function JpgConverterPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Conversor WebP Inteligente Antigravity - JPG para WebP",
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
      "Execução paralela em Web Workers",
      "Sem limites de upload ou tamanho de arquivo",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <JpgConverterClient />
    </>
  );
}
