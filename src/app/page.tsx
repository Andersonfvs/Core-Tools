import React from "react";
import Link from "next/link";
import BuyMeACoffee from "@/components/BuyMeACoffee";
import DecodedText from "@/components/DecodedText";

interface ToolCardProps {
  title: string;
  description: string;
  href: string;
  badge: string;
  stats: { label: string; value: string }[];
}

function ToolCard({ title, description, href, badge, stats }: ToolCardProps) {
  return (
    <Link
      href={href}
      className="flex flex-col p-6 bg-brand-panel border border-brand-border hover:border-brand-accent/50 hover:bg-[#0d0d10] transition-all duration-300 relative group cursor-pointer"
    >
      {/* Corner cross decorations */}
      <span className="absolute top-1 left-2 font-mono text-[9px] text-zinc-800 select-none">[+]</span>
      <span className="absolute bottom-1 right-2 font-mono text-[9px] text-zinc-800 select-none">[+]</span>

      <div className="flex justify-between items-baseline mb-3">
        <h2 className="font-sans text-lg font-extrabold uppercase tracking-wide text-brand-text group-hover:text-brand-accent transition-colors">
          <DecodedText text={title} triggerOnLoad={false} />
        </h2>
        <span className="font-mono text-[9px] uppercase tracking-wider text-brand-accent bg-brand-accent/10 px-2 py-0.5 border border-brand-accent/20">
          {badge}
        </span>
      </div>

      <p className="font-mono text-xs text-brand-muted mb-6 flex-grow leading-relaxed">
        {description}
      </p>

      {/* Tech Specifications */}
      <div className="border-t border-brand-border/60 pt-4 mt-auto font-mono text-[10px] text-zinc-500">
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex justify-between border-b border-brand-border/20 pb-0.5">
              <span>{stat.label}</span>
              <span className="text-zinc-300 font-semibold">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default function Home() {
  return (
    <main className="flex-grow flex flex-col items-center justify-center px-6 py-16 md:py-24 max-w-5xl mx-auto w-full relative">
      
      {/* Header Section */}
      <header className="flex flex-col items-center text-center mb-16 w-full">
        {/* Large Graphic Circuit Synapse Logo (TE Style) */}
        <div className="relative w-14 h-14 flex items-center justify-center border border-zinc-800 bg-[#0a0a0c] mb-6">
          <span className="absolute top-[-3px] left-[-3px] text-[9px] text-zinc-600">[+]</span>
          <span className="absolute bottom-[-3px] right-[-3px] text-[9px] text-zinc-600">[+]</span>
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            className="w-8 h-8 text-zinc-400"
            stroke="currentColor" 
            strokeWidth="1.5"
          >
            <path d="M4 6h6l4 4h6" />
            <path d="M20 18h-6l-4-4H4" />
            <circle cx="4" cy="6" r="1.5" fill="#d4ff00" stroke="#d4ff00" />
            <circle cx="20" cy="18" r="1.5" fill="#d4ff00" stroke="#d4ff00" />
          </svg>
        </div>
        
        <h1 className="font-sans text-3xl md:text-5xl font-black uppercase tracking-wider text-brand-text mb-3">
          <DecodedText text="CORE_TOOLS // SYS" />
        </h1>
        
        <p className="font-mono text-xs text-brand-muted max-w-md uppercase tracking-wider leading-relaxed">
          Ferramentas utilitárias serverless rodando 100% de forma local no seu navegador.
        </p>
      </header>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-12">
        <ToolCard
          title="PNG ➡️ WebP"
          description="Converta imagens PNG em lotes para WebP com algoritmo adaptativo inteligente rodando no cliente."
          href="/converter-png-para-webp"
          badge="Image"
          stats={[
            { label: "engine", value: "web workers" },
            { label: "upload limit", value: "unlimited" },
            { label: "compression", value: "adaptive" },
            { label: "privacy", value: "100% local" },
          ]}
        />
        <ToolCard
          title="JPG ➡️ WebP"
          description="Converta imagens JPG ou JPEG para formato WebP otimizado de carregamento rápido."
          href="/converter-jpg-para-webp"
          badge="Image"
          stats={[
            { label: "engine", value: "web workers" },
            { label: "upload limit", value: "unlimited" },
            { label: "compression", value: "adaptive" },
            { label: "privacy", value: "100% local" },
          ]}
        />
        <ToolCard
          title="Descompactador ZIP"
          description="Abra, explore a árvore de diretórios e extraia arquivos ZIP instantaneamente na sua RAM."
          href="/descompactar-zip-online"
          badge="Archive"
          stats={[
            { label: "engine", value: "fflate (wasm)" },
            { label: "speed", value: "ram bound" },
            { label: "subfolders", value: "supported" },
            { label: "privacy", value: "100% local" },
          ]}
        />
        <ToolCard
          title="Abrir Arquivo RAR"
          description="Extraia arquivos RAR (v4 e v5) localmente usando decodificador nativo compilado em WebAssembly."
          href="/abrir-arquivo-rar-online"
          badge="Archive"
          stats={[
            { label: "engine", value: "wasm (unrar)" },
            { label: "load type", value: "on-demand" },
            { label: "rar versions", value: "v4 & v5" },
            { label: "privacy", value: "100% local" },
          ]}
        />
      </div>

      {/* <BuyMeACoffee /> */}

      {/* Footer Status Bar */}
      <footer className="mt-20 w-full border-t border-brand-border pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-zinc-500">
        <div className="uppercase tracking-wider">CoreTools // All processing is client-side</div>
        <div className="flex items-center gap-2">
          <span>HOST: STATIC EDGE</span>
          <span className="text-zinc-700">|</span>
          <span className="text-brand-accent">V1.1.0-PROD</span>
        </div>
      </footer>
    </main>
  );
}
