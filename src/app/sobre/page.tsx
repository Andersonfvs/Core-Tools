import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre Nós - CoreTools // Utilities",
  description:
    "Conheça a missão do CoreTools Utilities: desenvolver ferramentas web velozes, eficientes e focadas em privacidade 100% client-side.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutPage() {
  return (
    <main className="flex-grow max-w-3xl mx-auto px-6 py-12 font-mono text-xs text-brand-muted leading-relaxed w-full">
      <div className="relative border border-brand-border p-8 bg-brand-panel/20">
        <span className="absolute top-1 left-2 text-zinc-700 select-none">[About]</span>
        <span className="absolute bottom-1 right-2 text-zinc-700 select-none">[Project Info]</span>

        <div className="flex flex-col items-center mb-8 text-center">
          {/* Graphic Circuit Synapse Logo (TE Style) */}
          <div className="relative w-12 h-12 flex items-center justify-center border border-zinc-800 bg-[#0a0a0c] mb-4">
            <span className="absolute top-[-3px] left-[-3px] text-[8px] text-zinc-600">[+]</span>
            <span className="absolute bottom-[-3px] right-[-3px] text-[8px] text-zinc-600">[+]</span>
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              className="w-7 h-7 text-zinc-400"
              stroke="currentColor" 
              strokeWidth="1.5"
            >
              <path d="M4 6h6l4 4h6" />
              <path d="M20 18h-6l-4-4H4" />
              <circle cx="4" cy="6" r="1.5" fill="#d4ff00" stroke="#d4ff00" />
              <circle cx="20" cy="18" r="1.5" fill="#d4ff00" stroke="#d4ff00" />
            </svg>
          </div>
          <h1 className="font-sans text-2xl font-black text-brand-text uppercase tracking-wide">
            Sobre o Projeto
          </h1>
          <p className="text-brand-accent mt-2 text-xs uppercase tracking-wider font-semibold">
            CoreTools // Utilities Suite
          </p>
        </div>

        <div className="space-y-5 text-justify">
          <p>
            O **CoreTools // Utilities** nasceu com a missão de simplificar tarefas cotidianas da web de forma limpa, direta e, acima de tudo, segura. Percebemos que a maioria das ferramentas online para tarefas simples (como converter formatos de imagem ou descompactar arquivos) exige que o usuário envie seus dados particulares para servidores de terceiros.
          </p>
          
          <p>
            Isso não apenas consome largura de banda, como também expõe arquivos e informações sensíveis a riscos de privacidade. Acreditamos que a computação moderna em navegadores é potente o suficiente para evitar esse tráfego desnecessário.
          </p>

          <h3 className="font-sans text-xs font-bold text-brand-text uppercase tracking-wider mt-6 mb-2 border-b border-brand-border pb-1">
            Nossos Pilares
          </h3>
          <ul className="list-disc pl-4 space-y-2">
            <li>
              <strong>Privacidade Absoluta (Zero-Upload):</strong> Seus arquivos nunca saem do seu computador ou celular. A conversão e descompressão rodam inteiramente dentro da sandbox do seu próprio navegador.
            </li>
            <li>
              <strong>Design Minimalista e Funcional:</strong> Nossas interfaces são focadas na utilidade direta, sem poluição visual, anúncios abusivos ou telas piscantes. Inspirado em design de hardware moderno e limpo.
            </li>
            <li>
              <strong>Velocidade Nativa (WebAssembly & Workers):</strong> Usamos as tecnologias web mais modernas, como Web Workers para executar tarefas pesadas em background e WebAssembly compilado a partir de código C++ para realizar leituras binárias complexas na velocidade da sua RAM.
            </li>
          </ul>

          <h3 className="font-sans text-xs font-bold text-brand-text uppercase tracking-wider mt-6 mb-2 border-b border-brand-border pb-1">
            Contato & Suporte
          </h3>
          <p>
            Caso tenha dúvidas técnicas, queira reportar bugs ou enviar sugestões de novas utilidades locais, você pode entrar em contato através do nosso email de suporte oficial: 
            <span className="text-brand-accent font-semibold ml-1">contato@fvsynapse.com.br</span>.
          </p>
        </div>
      </div>
    </main>
  );
}
