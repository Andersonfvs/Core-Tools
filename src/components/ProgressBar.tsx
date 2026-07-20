import React from "react";

interface ProgressBarProps {
  progress: number;
  color?: "cyan" | "pink"; // Preserved for compatibility
  showText?: boolean;
}

export default function ProgressBar({
  progress,
  showText = true,
}: ProgressBarProps) {
  const percent = Math.min(100, Math.max(0, Math.round(progress)));

  return (
    <div className="w-full flex flex-col gap-1 font-mono text-[10px] text-brand-muted">
      <div className="flex justify-between items-center">
        <span className="uppercase tracking-wider">Processando...</span>
        {showText && <span className="text-brand-text font-bold">{percent}%</span>}
      </div>
      
      {/* Bar Container */}
      <div className="h-1.5 w-full bg-zinc-950 border border-brand-border rounded-none overflow-hidden relative">
        {/* Fill Bar */}
        <div
          className="h-full bg-brand-accent transition-all duration-300 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
