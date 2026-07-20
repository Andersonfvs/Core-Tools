"use client";

import React, { useState, useRef } from "react";

interface DropzoneProps {
  onFilesAdded: (files: File[]) => void;
  accept: string;
  title: string;
  description: string;
  color?: "cyan" | "pink"; // Left for compatibility but styled with our uniform system
}

export default function Dropzone({
  onFilesAdded,
  accept,
  title,
  description,
  color = "cyan",
}: DropzoneProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files: File[] = [];
      const acceptedTypes = accept.split(",").map((type) => type.trim());

      for (let i = 0; i < e.dataTransfer.files.length; i++) {
        const file = e.dataTransfer.files[i];
        
        // Simple validation matching file extension or mime type
        const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`;
        const matchesExtension = acceptedTypes.some((type) => type.startsWith(".") && type === fileExtension);
        const matchesMime = acceptedTypes.some((type) => !type.startsWith(".") && (file.type.match(new RegExp(type.replace("*", ".*"))) || type === file.type));

        if (matchesExtension || matchesMime || accept === "*") {
          files.push(file);
        }
      }

      if (files.length > 0) {
        onFilesAdded(files);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const files: File[] = Array.from(e.target.files);
      onFilesAdded(files);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const activeBorderClass = isDragActive
    ? "border-brand-accent bg-brand-accent/5 scan-active"
    : "border-brand-border hover:border-brand-accent/50 bg-brand-panel/30";

  return (
    <div
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      className={`w-full border p-10 md:p-14 text-center transition-all duration-300 relative group flex flex-col items-center justify-center ${activeBorderClass}`}
    >
      {/* Corner crosshairs instead of flashing neons (Industrial drafting style) */}
      <span className="absolute top-1 left-2 font-mono text-[9px] text-zinc-700 select-none hover-rotate-cross">[+]</span>
      <span className="absolute top-1 right-2 font-mono text-[9px] text-zinc-700 select-none hover-rotate-cross">[+]</span>
      <span className="absolute bottom-1 left-2 font-mono text-[9px] text-zinc-700 select-none hover-rotate-cross">[+]</span>
      <span className="absolute bottom-1 right-2 font-mono text-[9px] text-zinc-700 select-none hover-rotate-cross">[+]</span>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Minimalist central draft marking */}
      <div className="w-10 h-10 border border-zinc-800 flex items-center justify-center font-mono text-xs text-zinc-600 mb-6 select-none">
        01
      </div>

      <h3 className="font-sans text-base font-bold text-brand-text tracking-wide mb-1.5 uppercase">
        {title}
      </h3>
      
      <p className="font-mono text-xs text-brand-muted mb-8 max-w-sm">
        {description}
      </p>

      <button
        onClick={onButtonClick}
        className="px-5 py-2 btn-tactile text-xs uppercase tracking-wider cursor-pointer"
      >
        Selecionar Arquivos
      </button>
    </div>
  );
}
