"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [crtEnabled, setCrtEnabled] = useState(true);

  useEffect(() => {
    // Read from localStorage to persist user settings
    const saved = localStorage.getItem("crt-mode");
    if (saved === "disabled") {
      setCrtEnabled(false);
      document.body.classList.add("crt-disabled");
    }
  }, []);

  const toggleCrt = () => {
    if (crtEnabled) {
      document.body.classList.add("crt-disabled");
      localStorage.setItem("crt-mode", "disabled");
      setCrtEnabled(false);
    } else {
      document.body.classList.remove("crt-disabled");
      localStorage.setItem("crt-mode", "enabled");
      setCrtEnabled(true);
    }
  };

  return (
    <footer className="w-full border-t border-brand-border bg-black py-8 mt-auto z-10 font-mono text-[10px] text-zinc-500">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left Side: Copyright and CRT Toggle */}
        <div className="uppercase tracking-wider flex items-center gap-4">
          <span>&copy; {currentYear} Antigravity // Processamento Local & Gratuito</span>
          <button
            onClick={toggleCrt}
            className="px-2 py-0.5 border border-brand-border text-zinc-500 hover:text-brand-accent hover:border-brand-accent/40 transition-colors uppercase text-[8px] cursor-pointer"
            title="Ligar/Desligar efeito de varredura analógica CRT"
          >
            [MONITOR CRT: {crtEnabled ? "ON" : "OFF"}]
          </button>
        </div>

        {/* Right Side: Links */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
          <Link href="/sobre" className="hover:text-brand-text transition-colors">
            Sobre Nós
          </Link>
          <Link href="/contato" className="hover:text-brand-text transition-colors">
            Contato
          </Link>
          <Link href="/politica-de-privacidade" className="hover:text-brand-text transition-colors">
            Privacidade
          </Link>
          <Link href="/termos-de-uso" className="hover:text-brand-text transition-colors">
            Termos de Uso
          </Link>
        </div>
      </div>
    </footer>
  );
}
