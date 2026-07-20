import React from "react";
import Link from "next/link";
import DecodedText from "./DecodedText";
import CoreToolsLogo from "./CoreToolsLogo";

export default function Header() {
  return (
    <header className="w-full border-b border-brand-border bg-black/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand Logo */}
        <Link href="/">
          <CoreToolsLogo />
        </Link>
        
        {/* Navigation links */}
        <nav className="flex gap-6 font-mono text-[11px] uppercase tracking-wider text-brand-muted">
          <Link href="/" className="hover:text-brand-text transition-colors">
            <DecodedText text="FERRAMENTAS" triggerOnLoad={false} />
          </Link>
          <Link href="/artigos" className="hover:text-brand-text transition-colors">
            <DecodedText text="ARTIGOS" triggerOnLoad={false} />
          </Link>
          <Link href="/sobre" className="hover:text-brand-text transition-colors">
            <DecodedText text="SOBRE" triggerOnLoad={false} />
          </Link>
          <Link href="/contato" className="hover:text-brand-text transition-colors">
            <DecodedText text="CONTATO" triggerOnLoad={false} />
          </Link>
        </nav>
      </div>
    </header>
  );
}
