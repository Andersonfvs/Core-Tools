import React from "react";

interface SynapseIconProps {
  className?: string;
}

export default function SynapseIcon({ className = "w-12 h-12" }: SynapseIconProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`${className} text-brand-text`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Viewfinder Outer frame */}
      <circle cx="50" cy="50" r="45" stroke="#222225" strokeWidth="1" />
      
      {/* Drafting Crosshairs */}
      <line x1="50" y1="5" x2="50" y2="20" stroke="#333339" strokeWidth="1" />
      <line x1="50" y1="80" x2="50" y2="95" stroke="#333339" strokeWidth="1" />
      <line x1="5" y1="50" x2="20" y2="50" stroke="#333339" strokeWidth="1" />
      <line x1="80" y1="50" x2="95" y2="50" stroke="#333339" strokeWidth="1" />
      
      {/* Minimalist Geometric Logo - "A" Monogram & Slashing lines */}
      <path
        d="M32 68 L50 28 L68 68"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <line
        x1="39"
        y1="54"
        x2="61"
        y2="54"
        stroke="currentColor"
        strokeWidth="3.5"
      />
      
      {/* Tech Accent Dot (Acid Lime) */}
      <circle cx="50" cy="28" r="4.5" className="fill-brand-accent animate-pulse" />
    </svg>
  );
}
