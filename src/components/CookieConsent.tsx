"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user already consented
    const consent = localStorage.getItem("antigravity-cookie-consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("antigravity-cookie-consent", "accepted");
    setShowBanner(false);
    
    // Dynamically reload window or trigger AdSense script activation if needed
    window.location.reload();
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 md:p-6 bg-black border-t border-brand-border font-mono text-[10px] text-brand-muted animate-flicker">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {/* Consent Text */}
        <div className="flex-grow leading-relaxed max-w-2xl">
          <span className="text-brand-accent font-bold uppercase block mb-1">Aviso de Cookies & Consentimento</span>
          <p>
            Utilizamos cookies para personalizar anúncios do Google AdSense e analisar nosso tráfego de forma anônima. 
            Ao clicar em &quot;Aceitar&quot;, você concorda com o uso de cookies em conformidade com nossa{" "}
            <Link href="/politica-de-privacidade" className="text-brand-text hover:text-brand-accent underline">
              Política de Privacidade
            </Link>{" "}
            e a LGPD.
          </p>
        </div>

        {/* Action Button */}
        <div className="shrink-0">
          <button
            onClick={handleAccept}
            className="px-5 py-2 btn-tactile-accent uppercase text-[10px] font-bold tracking-wider cursor-pointer"
          >
            Aceitar Todos
          </button>
        </div>
      </div>
    </div>
  );
}
