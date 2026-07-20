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

  // Use a real client ID from environment variables or a placeholder fallback
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID || "ca-pub-XXXXXXXXXXXXXXXX";

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
