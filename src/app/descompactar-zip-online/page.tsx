import React from "react";
import type { Metadata } from "next";
import ZipExtractorClient from "@/components/ZipExtractorClient";

export const metadata: Metadata = {
  title: "Descompactar ZIP Online Grátis - Abrir Arquivo ZIP sem Programas",
  description:
    "Visualize a estrutura de pastas e extraia arquivos ZIP localmente no navegador. Sem uploads externos, sem riscos de privacidade. Rápido, seguro e serverless.",
  keywords: [
    "descompactar zip online",
    "abrir arquivo zip online",
    "extrair zip gratis",
    "leitor zip online sem programa",
  ],
};

export default function ZipExtractorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Descompactador ZIP Client-Side CoreTools",
    "operatingSystem": "All",
    "applicationCategory": "UtilityApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
    },
    "featureList": [
      "Extração local instantânea com biblioteca fflate",
      "Leitura da árvore de arquivos e diretórios sem download completo",
      "Sem limite de tamanho por rodar na RAM local",
      "Segurança corporativa sem upload para a nuvem",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ZipExtractorClient />
    </>
  );
}
