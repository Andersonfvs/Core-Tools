import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import AdSenseBanner from "@/components/AdSenseBanner";
import { ARTICLES } from "@/data/articles";

export const metadata: Metadata = {
  title: "Artigos Técnicos de Otimização e Performance - CoreTools",
  description:
    "Explore guias, análises e artigos técnicos originais sobre velocidade de carregamento web, compressão de imagens WebP e segurança client-side.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function ArticlesListPage() {
  return (
    <main className="flex-grow max-w-4xl mx-auto px-6 py-12 w-full relative z-10">
      {/* Header Title */}
      <div className="border-b border-brand-border pb-6 mb-10 font-mono">
        <span className="text-[10px] text-brand-accent uppercase tracking-widest block mb-2">
          Bespoke Tech Blog // Insights
        </span>
        <h1 className="font-sans text-3xl font-black uppercase text-brand-text tracking-wide">
          Artigos Técnicos
        </h1>
      </div>

      {/* Ad Placement */}
      <AdSenseBanner slot="9876543210" />

      {/* Articles List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {ARTICLES.map((article) => (
          <article
            key={article.slug}
            className="flex flex-col p-6 bg-brand-panel border border-brand-border hover:border-brand-accent/40 transition-colors duration-300 relative group"
          >
            {/* Corner tech decorators */}
            <span className="absolute top-1 left-2 font-mono text-[9px] text-zinc-800 select-none">[+]</span>
            
            <div className="flex justify-between items-center font-mono text-[9px] text-brand-muted uppercase mb-3">
              <span>{article.category}</span>
              <span>{article.readingTime}</span>
            </div>

            <h2 className="font-sans text-base font-bold text-brand-text group-hover:text-brand-accent transition-colors leading-snug mb-3">
              <Link href={`/artigos/${article.slug}`}>
                {article.title}
              </Link>
            </h2>

            <p className="font-mono text-xs text-brand-muted mb-6 flex-grow leading-relaxed">
              {article.summary}
            </p>

            <div className="mt-auto pt-4 border-t border-brand-border/40 flex justify-between items-center font-mono text-[10px]">
              <span className="text-zinc-500">{article.date}</span>
              <Link
                href={`/artigos/${article.slug}`}
                className="text-brand-accent uppercase font-bold hover:text-white transition-colors"
              >
                Ler Artigo &gt;
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
