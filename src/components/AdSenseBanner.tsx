"use client";

import React, { useEffect } from "react";

interface AdSenseBannerProps {
  slot: string;
  format?: string;
  responsive?: string;
}

export default function AdSenseBanner({
  slot,
  format = "auto",
  responsive = "true",
}: AdSenseBannerProps) {
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID;

  useEffect(() => {
    if (!publisherId || publisherId.includes("XXXXXXXX")) return;
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (e) {
      // Squelch errors if AdSense script is blocked or not loaded yet
    }
  }, [publisherId]);

  // Se não houver ID real do AdSense configurado, omitir o bloco para não exibir marcas de placeholder aos revisores
  if (!publisherId || publisherId.includes("XXXXXXXX")) {
    return null;
  }

  return (
    <div className="w-full flex flex-col items-center my-6">
      <span className="font-mono text-[8px] text-zinc-600 uppercase tracking-widest mb-1.5 select-none">
        Anúncio
      </span>
      
      <div className="w-full min-h-[90px] md:min-h-[100px] bg-transparent flex items-center justify-center relative">
        {/* AdSense Slot */}
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%", height: "100%" }}
          data-ad-client={publisherId}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={responsive}
        />
      </div>
    </div>
  );
}
