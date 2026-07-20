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
  useEffect(() => {
    // Run AdSense push in browser environment
    try {
      const adsbygoogle = (window as any).adsbygoogle || [];
      adsbygoogle.push({});
    } catch (e) {
      // Squelch errors if AdSense script is blocked or not loaded yet
    }
  }, []);

  // Use a mock client ID that the user can replace in a global config or env variable later
  const publisherId = "ca-pub-XXXXXXXXXXXXXXXX"; // Substituir pelo ID real do AdSense

  return (
    <div className="w-full flex flex-col items-center my-6">
      <span className="font-mono text-[8px] text-zinc-600 uppercase tracking-widest mb-1.5 select-none">
        Anúncio
      </span>
      
      <div className="w-full min-h-[90px] md:min-h-[100px] border border-brand-border bg-brand-panel/30 flex items-center justify-center relative overflow-hidden">
        {/* AdSense Slot */}
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%", height: "100%" }}
          data-ad-client={publisherId}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={responsive}
        />
        
        {/* Visual Technical Placeholder for draft and crawler check */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 border border-dashed border-zinc-900 bg-brand-panel/10">
          <span className="font-mono text-[9px] text-zinc-500 tracking-wider">
            [ BLOCO DE ANÚNCIO: {slot} ]
          </span>
        </div>
      </div>
    </div>
  );
}
