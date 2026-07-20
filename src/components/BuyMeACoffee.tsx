"use client";

import React, { useState, useEffect } from "react";
import DecodedText from "./DecodedText";

export default function BuyMeACoffee() {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState(15);
  const [copied, setCopied] = useState(false);
  const [waveOffset, setWaveOffset] = useState(0);

  // Animate the oscilloscope wave in the background
  useEffect(() => {
    let animationId: number;
    const animate = () => {
      setWaveOffset((prev) => (prev + 0.1) % (Math.PI * 2));
      animationId = requestAnimationFrame(animate);
    };
    if (isOpen) {
      animationId = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(animationId);
  }, [isOpen]);

  const handleCopy = () => {
    navigator.clipboard.writeText("contato@fvsynapse.com.br");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate SVG path for the wave based on selected amount (frequency/amplitude)
  const getWavePath = () => {
    const points = [];
    const amplitude = Math.min(amount * 0.4 + 5, 30);
    const frequency = 0.05 + (amount * 0.001);
    for (let x = 0; x <= 320; x += 2) {
      const y = 35 + Math.sin(x * frequency + waveOffset) * amplitude;
      points.push(`${x},${y}`);
    }
    return `M ${points.join(" L ")}`;
  };

  return (
    <div className="mt-8 flex justify-center">
      <button
        onClick={() => setIsOpen(true)}
        className="px-5 py-2.5 btn-tactile text-xs uppercase tracking-wider cursor-pointer font-bold border-brand-border flex items-center gap-2 group"
      >
        <span className="text-brand-accent group-hover:animate-pulse">⚡</span>
        <DecodedText text="CONTRIBUIR VIA PIX // SYS" triggerOnLoad={false} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="relative w-full max-w-md bg-brand-panel border border-brand-border p-6 font-mono text-xs text-brand-muted">
            {/* Drafting corners hoverable */}
            <span className="absolute top-1 left-2 font-mono text-[9px] text-zinc-700 select-none hover-rotate-cross">[+]</span>
            <span className="absolute top-1 right-2 font-mono text-[9px] text-zinc-700 select-none hover-rotate-cross">[+]</span>
            <span className="absolute bottom-1 left-2 font-mono text-[9px] text-zinc-700 select-none hover-rotate-cross">[+]</span>
            <span className="absolute bottom-1 right-2 font-mono text-[9px] text-zinc-700 select-none hover-rotate-cross">[+]</span>

            {/* Header / Title */}
            <div className="flex justify-between items-center border-b border-brand-border pb-3 mb-4">
              <div className="flex flex-col">
                <span className="text-[8px] text-brand-accent uppercase tracking-widest">Teenage Engineering Style</span>
                <h3 className="font-sans text-sm font-black text-brand-text tracking-wide uppercase">
                  MODULE-01: DONATION UNIT
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-brand-muted hover:text-white text-[10px] uppercase border border-brand-border px-2 py-0.5 hover:border-brand-accent/50 transition-colors"
              >
                [CLOSE]
              </button>
            </div>

            {/* Interactive Hardware Synthesizer Display */}
            <div className="bg-black border border-brand-border p-4 rounded-none mb-5 relative overflow-hidden">
              <div className="flex justify-between text-[9px] text-zinc-500 mb-2">
                <span>OSCILLOSCOPE: active</span>
                <span>AMP: {amount}V</span>
              </div>
              
              {/* Draw live rendering SVG wave acting as TE OP-1 display */}
              <div className="h-16 w-full bg-zinc-950 border border-zinc-900/50 flex items-center relative overflow-hidden mb-4">
                {/* Horizontal center grid line */}
                <div className="absolute inset-x-0 h-[1px] bg-zinc-900" />
                <svg className="w-full h-full relative z-10">
                  <path
                    d={getWavePath()}
                    fill="none"
                    stroke="#d4ff00"
                    strokeWidth="1.5"
                    className="opacity-90"
                  />
                </svg>
              </div>

              {/* Slider representing the Voltage input */}
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] uppercase font-bold text-zinc-400">
                  <span>Ajustar Intensidade (R$)</span>
                  <span className="text-brand-accent">R$ {amount},00</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full accent-brand-accent cursor-pointer"
                />
                <div className="flex justify-between text-[8px] text-zinc-600">
                  <span>MIN: 5</span>
                  <span>MED: 50</span>
                  <span>MAX: 100</span>
                </div>
              </div>
            </div>

            <p className="text-[11px] leading-relaxed text-zinc-400 mb-5">
              Obrigado por apoiar o <span className="text-brand-text">CoreTools // Utilities</span>! Este projeto é gratuito e processado inteiramente em sua RAM. Ao calibrar a tensão acima, você decide o nível da sua contribuição voluntária para os custos operacionais.
            </p>

            {/* Pix Destination */}
            <div className="bg-black/60 border border-brand-border p-4 mb-5">
              <div className="flex flex-col items-center mb-4">
                {/* Simplified QR Code placeholder aligned with industrial look */}
                <div className="w-36 h-36 bg-white p-2 rounded-none flex items-center justify-center relative">
                  <svg className="w-full h-full text-black" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2,2 H8 V8 H2 Z M4,4 H6 V6 H4 Z" />
                    <path d="M16,2 H22 V8 H16 Z M18,4 H20 V6 H18 Z" />
                    <path d="M2,16 H8 V22 H2 Z M4,18 H6 V20 H4 Z" />
                    <path d="M12,12 H14 V14 H12 Z M10,10 H12 V12 H10 Z" />
                    <path d="M14,10 H16 V12 H14 Z M16,14 H18 V16 H16 Z" />
                    <path d="M10,14 H12 V18 H10 Z M12,18 H14 V20 H12 Z" />
                    <path d="M14,16 H16 V18 H14 Z M16,18 H20 V22 H16 Z" />
                    <path d="M18,10 H22 V14 H18 Z" />
                  </svg>
                </div>
              </div>

              <div className="w-full font-mono text-[10px]">
                <span className="block text-zinc-500 uppercase mb-1">Chave Pix (E-mail):</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value="contato@fvsynapse.com.br"
                    className="flex-grow bg-brand-panel border border-brand-border px-2.5 py-1.5 text-brand-text focus:outline-none focus:border-brand-accent rounded-none text-xs"
                  />
                  <button
                    onClick={handleCopy}
                    className="px-4 py-1 bg-brand-accent text-black font-bold uppercase hover:bg-white transition-colors cursor-pointer text-xs"
                  >
                    {copied ? "Copiado!" : "Copiar"}
                  </button>
                </div>
              </div>
            </div>

            <div className="text-center font-mono text-[8px] text-zinc-600">
              SYS_STATUS: READY // ENVELOPE GENERATOR: PASSIVE
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
