import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdSenseBanner from "@/components/AdSenseBanner";
import { ARTICLES } from "@/data/articles";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

// 1. Definição estática de caminhos obrigatória para o Next.js static export (output: export)
export async function generateStaticParams() {
  return ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

// 2. Geração dinâmica de metadados de SEO para cada página de artigo
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) return {};

  return {
    title: `${article.title} - CoreTools`,
    description: article.summary,
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": article.title,
    "description": article.summary,
    "datePublished": article.dateISO || new Date().toISOString(),
    "author": {
      "@type": "Person",
      "name": article.author?.name || "Redação CoreTools",
      "jobTitle": article.author?.role || "Especialista Técnico"
    },
    "publisher": {
      "@type": "Organization",
      "name": "CoreTools",
      "logo": {
        "@type": "ImageObject",
        "url": "https://coretools.fvsynapse.com.br/next.svg"
      }
    }
  };

  return (
    <main className="flex-grow max-w-3xl mx-auto px-6 py-12 w-full relative z-10 font-mono text-xs">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Navigation */}
      <div className="w-full flex justify-start mb-8">
        <Link
          href="/artigos"
          className="px-3.5 py-1.5 btn-tactile text-[10px] uppercase tracking-wider"
        >
          &lt;= Voltar para Lista
        </Link>
      </div>

      {/* Article Container */}
      <article className="relative border border-brand-border p-8 bg-brand-panel/20 text-brand-muted leading-relaxed">
        {/* Corner crosshairs */}
        <span className="absolute top-1 left-2 font-mono text-[9px] text-zinc-700 select-none">[+]</span>
        <span className="absolute bottom-1 right-2 font-mono text-[9px] text-zinc-700 select-none">[+]</span>

        {/* Category & Stats */}
        <div className="flex justify-between items-center font-mono text-[9px] text-brand-accent uppercase mb-4 pb-2 border-b border-brand-border/40">
          <span>{article.category}</span>
          <span>{article.readingTime}</span>
        </div>

        <h1 className="font-sans text-2xl md:text-3xl font-black text-brand-text uppercase leading-tight mb-4 tracking-wide">
          {article.title}
        </h1>

        <div className="text-zinc-500 mb-8 text-[10px] flex flex-wrap items-center gap-x-2 gap-y-1">
          <span>Publicado em {article.date}</span>
          <span className="text-zinc-700">|</span>
          <span>Por {article.author?.name || "Redação CoreTools"}</span>
          <span className="text-zinc-700">|</span>
          <span>CoreTools Editorial</span>
        </div>

        {/* Article Paragraphs */}
        <div className="space-y-4 text-zinc-200 text-justify">
          {article.content.map((block, idx) => {
            if (block.startsWith("### ")) {
              return (
                <h3
                  key={idx}
                  className="font-sans text-xs font-extrabold text-brand-text uppercase mt-8 mb-3 border-b border-brand-border/60 pb-1.5 tracking-wider block"
                >
                  {block.replace("### ", "")}
                </h3>
              );
            }
            if (block.startsWith("- ")) {
              return (
                <div key={idx} className="flex items-start gap-2.5 my-2.5 pl-2 text-zinc-300 font-mono text-xs">
                  <span className="text-brand-accent shrink-0 select-none font-bold">▪</span>
                  <span>{block.substring(2)}</span>
                </div>
              );
            }
            return (
              <p key={idx} className="leading-relaxed mb-4">
                {block}
              </p>
            );
          })}
        </div>

        {/* AdSense Placement Inside Article */}
        <div className="mt-8 pt-4 border-t border-brand-border/30">
          <AdSenseBanner slot="5678901234" />
        </div>
      </article>
    </main>
  );
}
