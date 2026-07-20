"use client";

import React from "react";
import DecodedText from "./DecodedText";

export default function CoreToolsLogo() {
  return (
    <div className="flex items-center gap-3 font-mono select-none group cursor-pointer">
      {/* ÍCONE TÉCNICO: A Sinapse em Grade no estilo Teenage Engineering */}
      <div className="relative w-8 h-8 flex items-center justify-center border border-zinc-800 bg-[#0a0a0c]">
        {/* Miras lineares nos cantos que giram no hover global do logo */}
        <span className="absolute top-[-2px] left-[-2px] text-[8px] text-zinc-600 transition-transform duration-500 group-hover:rotate-90 hover-rotate-cross">[+]</span>
        <span className="absolute bottom-[-2px] right-[-2px] text-[8px] text-zinc-600 transition-transform duration-500 group-hover:rotate-90 hover-rotate-cross">[+]</span>
        
        {/* O Símbolo da Sinapse / Circuito em SVG Purista (Acid Lime) */}
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          className="w-5 h-5 text-zinc-400 group-hover:text-brand-accent transition-colors duration-300"
          stroke="currentColor" 
          strokeWidth="2"
          strokeLinecap="round"
        >
          {/* Trilha superior do circuito */}
          <path d="M4 6h6l4 4h6" />
          {/* Trilha inferior que cruza formando o 'S' implícito */}
          <path d="M20 18h-6l-4-4H4" />
          {/* Nós da Sinapse (Acid Lime) */}
          <circle cx="4" cy="6" r="1.5" fill="#d4ff00" stroke="#d4ff00" />
          <circle cx="20" cy="18" r="1.5" fill="#d4ff00" stroke="#d4ff00" />
        </svg>
      </div>

      {/* TIPOGRAFIA GEOMÉTRICA */}
      <div className="flex flex-col tracking-wider">
        <span className="text-sm font-bold text-white uppercase group-hover:text-brand-accent transition-colors duration-300">
          <DecodedText text="CORE" triggerOnLoad={true} />
          <span className="text-zinc-500 group-hover:text-white transition-colors duration-300">TOOLS</span>
        </span>
        <span className="text-[8px] text-zinc-600 font-mono -mt-1 uppercase tracking-widest">
          Local_Engine.sys
        </span>
      </div>
    </div>
  );
}
