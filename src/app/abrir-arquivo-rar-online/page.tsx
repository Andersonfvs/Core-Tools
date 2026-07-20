import React from "react";
import type { Metadata } from "next";
import RarExtractorClient from "@/components/RarExtractorClient";

export const metadata: Metadata = {
  title: "Abrir Arquivo RAR Online Grátis - Extrair RAR sem WinRAR",
  description:
    "Abra e extraia arquivos RAR (v4 e v5) online sem instalar programas. Processamento local ultra-rápido via WebAssembly (unrar.wasm) ativado sob demanda.",
  keywords: [
    "abrir arquivo rar online",
    "descompactar rar online",
    "extrair rar sem winrar",
    "abrir rar online celular chromebook",
  ],
};

export default function RarExtractorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Descompactador RAR WebAssembly Antigravity",
    "operatingSystem": "All",
    "applicationCategory": "UtilityApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
    },
    "featureList": [
      "Processamento local sandbox via WebAssembly unrar.cpp",
      "Suporte a formatos de arquivos RAR v4 e v5",
      "Carregamento dinâmico deferido do binário WASM",
      "Visualização e download de itens individuais",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RarExtractorClient />
    </>
  );
}
