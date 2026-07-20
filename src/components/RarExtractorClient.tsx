"use client";

import React, { useState } from "react";
import Link from "next/link";
import Dropzone from "./Dropzone";
import { unrarArchive, ExtractedFile } from "@/engines/unzipper";
import { formatBytes } from "./FileList";
import ProgressBar from "./ProgressBar";
import AdSenseBanner from "./AdSenseBanner";

export default function RarExtractorClient() {
  const [extractedFiles, setExtractedFiles] = useState<ExtractedFile[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [loadingStep, setLoadingStep] = useState("");
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [rarName, setRarName] = useState("");

  const handleFilesAdded = async (files: File[]) => {
    if (files.length === 0) return;
    const file = files[0]; // Process only first RAR file
    setRarName(file.name);
    setStatus("loading");
    setProgress(15);
    setLoadingStep("Baixando biblioteca WebAssembly...");

    try {
      // 1. Fetch WASM file on demand
      const response = await fetch("/unrar.wasm");
      if (!response.ok) {
        throw new Error("Não foi possível carregar o binário WebAssembly (/unrar.wasm).");
      }
      setProgress(40);
      setLoadingStep("Inicializando runtime C++...");
      
      const wasmBinary = await response.arrayBuffer();
      setProgress(60);
      setLoadingStep("Decodificando arquivos RAR...");

      // 2. Run the unrar engine
      const results = await unrarArchive(file, wasmBinary);
      setProgress(100);
      setExtractedFiles(results);
      setStatus("success");
    } catch (err: any) {
      setErrorMsg(err.message || "Erro ao descompactar RAR.");
      setStatus("error");
    }
  };

  const downloadFile = (file: ExtractedFile) => {
    const blob = new Blob([file.content as any]);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    
    // Extract filename from path
    const pathParts = file.name.split("/");
    const filename = pathParts[pathParts.length - 1] || "arquivo_extraido";
    
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setExtractedFiles([]);
    setStatus("idle");
    setProgress(0);
    setErrorMsg("");
    setRarName("");
    setLoadingStep("");
  };

  const totalOriginalSize = extractedFiles.reduce((acc, f) => acc + (f.isDirectory ? 0 : f.size), 0);
  const fileCount = extractedFiles.filter(f => !f.isDirectory).length;

  return (
    <div className="flex-grow flex flex-col items-center max-w-3xl mx-auto w-full px-6 py-12 relative z-10">
      {/* Navigation */}
      <div className="w-full flex justify-start mb-8">
        <Link
          href="/"
          className="px-3.5 py-1.5 btn-tactile text-[10px] uppercase tracking-wider"
        >
          &lt;= Retornar ao Painel
        </Link>
      </div>

      {/* Header */}
      <div className="w-full text-center mb-8">
        <span className="font-mono text-[10px] text-brand-accent uppercase tracking-widest block mb-2">
          Decompressor // Channel 04
        </span>
        <h1 className="font-sans text-2xl md:text-4xl font-extrabold uppercase text-brand-text tracking-wide">
          Abrir Arquivo RAR <span className="text-brand-accent">Online</span>
        </h1>
        <p className="font-mono text-xs text-brand-muted mt-2 max-w-xl mx-auto">
          Abra e extraia arquivos RAR (v4 e v5) diretamente no seu navegador usando runtime de WebAssembly.
        </p>
      </div>

      {/* Workspace */}
      <div className="w-full mb-10">
        {status === "idle" && (
          <Dropzone
            onFilesAdded={handleFilesAdded}
            accept=".rar"
            title="Carregar arquivo RAR"
            description="Os arquivos serão descompactados de forma local na RAM. Suporta formatos .rar"
            color="pink"
          />
        )}

        {status === "loading" && (
          <div className="w-full bg-brand-panel/30 border border-brand-border p-8 text-center font-mono">
            <h3 className="text-brand-text uppercase font-bold tracking-wider text-xs mb-1">Carga de Dependência...</h3>
            <span className="text-[10px] text-brand-accent block mb-4 animate-pulse">{loadingStep}</span>
            <ProgressBar progress={progress} showText={false} />
          </div>
        )}

        {status === "error" && (
          <div className="w-full bg-brand-panel/30 border border-brand-border p-8 text-center font-mono">
            <span className="text-red-500 text-2xl block mb-3">⚠️</span>
            <h3 className="text-brand-text uppercase font-bold tracking-wider text-xs mb-1">Falha na Extração WASM</h3>
            <p className="text-brand-muted text-xs mb-6">{errorMsg}</p>
            <button
              onClick={handleClear}
              className="px-5 py-2 btn-tactile-accent text-xs uppercase tracking-wider cursor-pointer"
            >
              Tentar Novamente
            </button>
          </div>
        )}

        {status === "success" && (
          <div className="w-full bg-brand-panel/30 border border-brand-border p-6 relative font-mono text-xs">
            {/* Draft corner marks */}
            <span className="absolute top-1 left-2 font-mono text-[9px] text-zinc-700 select-none">[+]</span>
            <span className="absolute bottom-1 right-2 font-mono text-[9px] text-zinc-700 select-none">[+]</span>

            {/* Archive details */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-brand-border pb-4 mb-5">
              <div>
                <span className="text-zinc-500 uppercase tracking-widest text-[9px] block mb-1">Arquivo Carregado</span>
                <span className="text-brand-text font-bold truncate block max-w-sm sm:max-w-md" title={rarName}>
                  {rarName}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right text-[10px]">
                  <span className="text-zinc-500 block">ESTATÍSTICAS:</span>
                  <span className="text-brand-text font-semibold">
                    {fileCount} itens ({formatBytes(totalOriginalSize)})
                  </span>
                </div>
                <button
                  onClick={handleClear}
                  className="px-3 py-1 btn-tactile text-[10px] uppercase cursor-pointer"
                >
                  Fechar
                </button>
              </div>
            </div>

            {/* File List */}
            <div className="max-h-96 overflow-y-auto space-y-2 pr-1">
              {extractedFiles.map((file, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between border p-3 text-[11px] ${
                    file.isDirectory
                      ? "border-brand-border bg-brand-panel/10 text-zinc-500"
                      : "border-brand-border bg-brand-panel/30 text-brand-text"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-4">
                    <span className="shrink-0">{file.isDirectory ? "📁" : "📄"}</span>
                    <span className="truncate font-medium block" title={file.name}>
                      {file.name}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 shrink-0">
                    {!file.isDirectory && (
                      <span className="text-brand-muted font-medium text-right min-w-[70px]">
                        {formatBytes(file.size)}
                      </span>
                    )}
                    
                    {!file.isDirectory && (
                      <button
                        onClick={() => downloadFile(file)}
                        className="px-3 py-1 btn-tactile text-[10px] font-bold uppercase cursor-pointer"
                      >
                        Baixar
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Rich Semantic FAQ Section for AdSense & SEO */}
      <section className="w-full border-t border-brand-border pt-10 font-mono text-xs text-brand-muted leading-relaxed mt-10">
        <h2 className="font-sans text-base font-black text-brand-text uppercase tracking-wider mb-6 pb-2 border-b border-brand-border/60">
          FAQ // Perguntas Frequentes sobre Abertura de Arquivos RAR
        </h2>
        
        <div className="space-y-6">
          <div className="border-b border-brand-border/40 pb-4">
            <h3 className="font-sans text-xs font-extrabold text-brand-text uppercase mb-2 flex items-center gap-2">
              <span className="text-brand-accent">▪</span> Por que é possível extrair arquivos RAR sem instalar o WinRAR?
            </h3>
            <p className="text-zinc-400">
              Graças à tecnologia de compiladores modernos, o código decodificador oficial escrito em linguagem de baixo nível C++ (o unrar nativo) foi totalmente portado e compilado em <span className="text-brand-text">WebAssembly (WASM)</span>. Isso permite que navegadores modernos executem o motor binário nativo da extração dentro de uma sandbox segura do navegador com velocidades de execução de hardware extremamente rápidas.
            </p>
          </div>

          <div className="border-b border-brand-border/40 pb-4">
            <h3 className="font-sans text-xs font-extrabold text-brand-text uppercase mb-2 flex items-center gap-2">
              <span className="text-brand-accent">▪</span> O leitor suporta os novos formatos RAR v5 e arquivos protegidos por senha?
            </h3>
            <p className="text-zinc-400">
              Sim. Nosso decodificador baseado em WebAssembly unrar possui suporte completo para ler e interpretar tanto a especificação clássica RAR v4 quanto os novos contêineres RAR v5 de alto desempenho de compressão.
            </p>
          </div>

          <div className="border-b border-brand-border/40 pb-4">
            <h3 className="font-sans text-xs font-extrabold text-brand-text uppercase mb-2 flex items-center gap-2">
              <span className="text-brand-accent">▪</span> Como é garantida a privacidade de arquivos confidenciais nesta página?
            </h3>
            <p className="text-zinc-400">
              A conformidade com leis de dados como a LGPD é assegurada pelo modelo serverless client-side. Nenhum byte do seu arquivo RAR é enviado ou transmitido para servidores de terceiros. A leitura binária inteira acontece de maneira isolada localmente dentro da thread ativa do seu navegador na RAM.
            </p>
          </div>

          <div>
            <h3 className="font-sans text-xs font-extrabold text-brand-text uppercase mb-2 flex items-center gap-2">
              <span className="text-brand-accent">▪</span> O arquivo .wasm é baixado todas as vezes?
            </h3>
            <p className="text-zinc-400">
              Não. O arquivo binário decodificador unrar.wasm é baixado dinamicamente via requisição fetch sob demanda apenas na primeira vez que um arquivo RAR é inserido no Dropzone. Ele é automaticamente armazenado em cache pelo navegador, garantindo que as próximas utilizações aconteçam sem tráfego de internet adicional.
            </p>
          </div>
        </div>
      </section>

      {/* AdSense slot posicionado com distanciamento seguro (longe de áreas interativas) */}
      <AdSenseBanner slot="4444444444" />
    </div>
  );
}
