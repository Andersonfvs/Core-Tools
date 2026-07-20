"use client";

import React from "react";
import Link from "next/link";
import { useFileQueue } from "@/hooks/useFileQueue";
import Dropzone from "./Dropzone";
import FileList from "./FileList";
import AdSenseBanner from "./AdSenseBanner";

export default function JpgConverterClient() {
  const {
    queue,
    isProcessing,
    addFiles,
    removeFile,
    clearQueue,
    startProcessing,
    downloadSingle,
    downloadAllAsZip,
    stats,
  } = useFileQueue();

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
          Image Optimizer // Channel 02
        </span>
        <h1 className="font-sans text-2xl md:text-4xl font-extrabold uppercase text-brand-text tracking-wide">
          Converter JPG para <span className="text-brand-accent">WebP</span>
        </h1>
        <p className="font-mono text-xs text-brand-muted mt-2 max-w-xl mx-auto">
          Comprima e converta imagens JPG ou JPEG para formato WebP inteligente 100% no seu navegador.
        </p>
      </div>

      {/* Workspace */}
      <div className="w-full mb-10">
        <Dropzone
          onFilesAdded={addFiles}
          accept="image/jpeg, image/jpg"
          title="Carregar imagens JPG / JPEG"
          description="Os arquivos serão convertidos localmente. Formatos suportados: .jpg, .jpeg"
          color="cyan"
        />

        <FileList
          queue={queue}
          isProcessing={isProcessing}
          stats={stats}
          removeFile={removeFile}
          downloadSingle={downloadSingle}
          downloadAllAsZip={downloadAllAsZip}
          startProcessing={startProcessing}
          clearQueue={clearQueue}
          color="cyan"
        />
      </div>

      {/* Rich Semantic FAQ Section for AdSense & SEO */}
      <section className="w-full border-t border-brand-border pt-10 font-mono text-xs text-brand-muted leading-relaxed mt-10">
        <h2 className="font-sans text-base font-black text-brand-text uppercase tracking-wider mb-6 pb-2 border-b border-brand-border/60">
          FAQ // Perguntas Frequentes sobre Conversão JPG para WebP
        </h2>
        
        <div className="space-y-6">
          <div className="border-b border-brand-border/40 pb-4">
            <h3 className="font-sans text-xs font-extrabold text-brand-text uppercase mb-2 flex items-center gap-2">
              <span className="text-brand-accent">▪</span> Por que converter JPG para WebP é importante para a velocidade do site?
            </h3>
            <p className="text-zinc-400">
              O formato JPG utiliza um algoritmo de compressão de imagens antigo de mais de 30 anos. O WebP do Google utiliza tecnologias modernas de codificação de vídeo preditiva (codec VP8), permitindo que imagens ocupem em média 30% a 40% menos espaço de armazenamento sem perda de qualidade visual. Sites mais leves reduzem o tempo de carregamento no celular e economizam banda dos usuários.
            </p>
          </div>

          <div className="border-b border-brand-border/40 pb-4">
            <h3 className="font-sans text-xs font-extrabold text-brand-text uppercase mb-2 flex items-center gap-2">
              <span className="text-brand-accent">▪</span> Como o Google AdSense e o algoritmo de buscas avaliam sites com imagens WebP?
            </h3>
            <p className="text-zinc-400">
              O Google utiliza a velocidade de carregamento real do usuário como fator de classificação de SEO através do <span className="text-brand-text">Core Web Vitals</span>. Sites que demoram a carregar imagens são penalizados e perdem tráfego orgânico. O formato WebP é explicitamente recomendado pela ferramenta de diagnóstico oficial PageSpeed Insights do Google como formato de próxima geração.
            </p>
          </div>

          <div className="border-b border-brand-border/40 pb-4">
            <h3 className="font-sans text-xs font-extrabold text-brand-text uppercase mb-2 flex items-center gap-2">
              <span className="text-brand-accent">▪</span> Qual o diferencial da conversão local (Client-Side)?
            </h3>
            <p className="text-zinc-400">
              Conversores tradicionais exigem que você faça upload de suas fotos particulares para servidores remotos para processar e devolver. Nossa ferramenta converte tudo na RAM local do seu próprio navegador via <span className="text-brand-text">Web Workers</span>. Isso garante 100% de conformidade com a LGPD, privacidade inabalável e velocidade instantânea, já que não gasta banda de upload.
            </p>
          </div>

          <div>
            <h3 className="font-sans text-xs font-extrabold text-brand-text uppercase mb-2 flex items-center gap-2">
              <span className="text-brand-accent">▪</span> Ocorrem perdas drásticas de cores na conversão de JPG para WebP?
            </h3>
            <p className="text-zinc-400">
              Não. O formato WebP suporta compressão com perdas inteligentes de alta fidelidade visual. O perfil cromático e o balanço de cores original da sua imagem JPEG são mantidos com extrema exatidão, removendo apenas informações redundantes e imperceptíveis a olho nu.
            </p>
          </div>
        </div>
      </section>

      {/* AdSense slot posicionado com distanciamento seguro (longe de áreas interativas) */}
      <AdSenseBanner slot="2222222222" />
    </div>
  );
}
