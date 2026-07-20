"use client";

import React, { useState } from "react";
import Link from "next/link";
import Dropzone from "./Dropzone";
import { unzipArchive, ExtractedFile } from "@/engines/unzipper";
import { formatBytes } from "./FileList";
import ProgressBar from "./ProgressBar";
import AdSenseBanner from "./AdSenseBanner";

export default function ZipExtractorClient() {
  const [extractedFiles, setExtractedFiles] = useState<ExtractedFile[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [zipName, setZipName] = useState("");

  const handleFilesAdded = async (files: File[]) => {
    if (files.length === 0) return;
    const file = files[0]; // Process only the first ZIP file
    setZipName(file.name);
    setStatus("loading");
    setProgress(30);

    try {
      setProgress(60);
      const results = await unzipArchive(file);
      setProgress(100);
      setExtractedFiles(results);
      setStatus("success");
    } catch (err: any) {
      setErrorMsg(err.message || "Erro desconhecido ao ler o ZIP.");
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
    setZipName("");
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
          Decompressor // Channel 03
        </span>
        <h1 className="font-sans text-2xl md:text-4xl font-extrabold uppercase text-brand-text tracking-wide">
          Descompactar ZIP <span className="text-brand-accent">Online</span>
        </h1>
        <p className="font-mono text-xs text-brand-muted mt-2 max-w-xl mx-auto">
          Visualize a estrutura interna de arquivos e faça o download do conteúdo descompactado localmente.
        </p>
      </div>

      {/* Workspace */}
      <div className="w-full mb-10">
        {status === "idle" && (
          <Dropzone
            onFilesAdded={handleFilesAdded}
            accept=".zip"
            title="Carregar arquivo ZIP"
            description="Os arquivos serão processados localmente. Formatos suportados: .zip"
            color="pink"
          />
        )}

        {status === "loading" && (
          <div className="w-full bg-brand-panel/30 border border-brand-border p-8 text-center font-mono">
            <h3 className="text-brand-text uppercase font-bold tracking-wider text-xs mb-3">Lendo Pacote Binário...</h3>
            <ProgressBar progress={progress} showText={false} />
          </div>
        )}

        {status === "error" && (
          <div className="w-full bg-brand-panel/30 border border-brand-border p-8 text-center font-mono">
            <span className="text-red-500 text-2xl block mb-3">⚠️</span>
            <h3 className="text-brand-text uppercase font-bold tracking-wider text-xs mb-1">Falha na Leitura</h3>
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
                <span className="text-brand-text font-bold truncate block max-w-sm sm:max-w-md" title={zipName}>
                  {zipName}
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

            {/* Directory File list */}
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
          FAQ // Perguntas Frequentes sobre Descompactação ZIP Online
        </h2>
        
        <div className="space-y-6">
          <div className="border-b border-brand-border/40 pb-4">
            <h3 className="font-sans text-xs font-extrabold text-brand-text uppercase mb-2 flex items-center gap-2">
              <span className="text-brand-accent">▪</span> Por que descompactar arquivos ZIP localmente é mais seguro?
            </h3>
            <p className="text-zinc-400">
              Descompactadores online tradicionais exigem que você faça o upload dos seus arquivos compactados para servidores em nuvem. Se os seus ZIPs contêm documentos pessoais, contratos corporativos ou backups de código-fonte, transmiti-los expõe seus dados a riscos de interceptação e quebra de privacidade. Nossa engine processa toda a descompactação direto na memória RAM da sua máquina, sem enviar nenhum byte pela internet.
            </p>
          </div>

          <div className="border-b border-brand-border/40 pb-4">
            <h3 className="font-sans text-xs font-extrabold text-brand-text uppercase mb-2 flex items-center gap-2">
              <span className="text-brand-accent">▪</span> Como o descompactador lê a estrutura de arquivos sem fazer download?
            </h3>
            <p className="text-zinc-400">
              A ferramenta utiliza a especificação do formato ZIP que grava o &quot;Diretório Central&quot; (índice de pastas e arquivos) no final do arquivo comprimido. Lemos apenas esse índice estrutural em milissegundos usando a biblioteca local <span className="text-brand-text">fflate</span>. Isso nos permite renderizar a árvore de arquivos instantaneamente para você escolher qual item individual deseja extrair, economizando memória.
            </p>
          </div>

          <div className="border-b border-brand-border/40 pb-4">
            <h3 className="font-sans text-xs font-extrabold text-brand-text uppercase mb-2 flex items-center gap-2">
              <span className="text-brand-accent">▪</span> Há limite de tamanho para abrir arquivos ZIP por aqui?
            </h3>
            <p className="text-zinc-400">
              Como o site não consome servidores remotos (que teriam gargalos de banda ou limites de upload), o limite de tamanho do arquivo ZIP é determinado unicamente pelo hardware do seu próprio computador (memória RAM livre disponível no seu navegador). Você pode abrir e explorar arquivos de gigabytes localmente com desempenho de SSD instantâneo.
            </p>
          </div>

          <div>
            <h3 className="font-sans text-xs font-extrabold text-brand-text uppercase mb-2 flex items-center gap-2">
              <span className="text-brand-accent">▪</span> Este utilitário funciona offline?
            </h3>
            <p className="text-zinc-400">
              Sim. Uma vez que a página é carregada pela primeira vez, toda a lógica Javascript de leitura de bytes binários e inflação de arquivos roda localmente no navegador. Você pode desconectar seu dispositivo da internet e continuar abrindo e extraindo arquivos ZIP de forma totalmente isolada.
            </p>
          </div>
        </div>
      </section>

      {/* AdSense slot posicionado com distanciamento seguro (longe de áreas interativas) */}
      <AdSenseBanner slot="3333333333" />
    </div>
  );
}
