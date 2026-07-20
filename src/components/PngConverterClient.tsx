"use client";

import React from "react";
import Link from "next/link";
import { useFileQueue } from "@/hooks/useFileQueue";
import Dropzone from "./Dropzone";
import FileList from "./FileList";
import AdSenseBanner from "./AdSenseBanner";

export default function PngConverterClient() {
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
          Image Optimizer // Channel 01
        </span>
        <h1 className="font-sans text-2xl md:text-4xl font-extrabold uppercase text-brand-text tracking-wide">
          Converter PNG para <span className="text-brand-accent">WebP</span>
        </h1>
        <p className="font-mono text-xs text-brand-muted mt-2 max-w-xl mx-auto">
          Comprima e converta imagens PNG para WebP em lote localmente no seu navegador.
        </p>
      </div>

      {/* Workspace */}
      <div className="w-full mb-10">
        <Dropzone
          onFilesAdded={addFiles}
          accept="image/png"
          title="Carregar imagens PNG"
          description="Os arquivos serão convertidos localmente. Formatos suportados: .png"
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
          FAQ // Perguntas Frequentes sobre Conversão WebP
        </h2>
        
        <div className="space-y-6">
          <div className="border-b border-brand-border/40 pb-4">
            <h3 className="font-sans text-xs font-extrabold text-brand-text uppercase mb-2 flex items-center gap-2">
              <span className="text-brand-accent">▪</span> Como a conversão de PNG para WebP impacta o SEO do meu site?
            </h3>
            <p className="text-zinc-400">
              Imagens em formato PNG tendem a ser extremamente pesadas devido à sua qualidade sem perdas e suporte à transparência. Ao convertê-las para WebP, o tamanho do arquivo é reduzido em até 80%, acelerando diretamente o tempo de carregamento da página. Para o algoritmo do Google, isso otimiza o <span className="text-brand-text">LCP (Largest Contentful Paint)</span>, que mede a velocidade de exibição do conteúdo principal na tela, melhorando diretamente sua posição nos resultados de pesquisa.
            </p>
          </div>

          <div className="border-b border-brand-border/40 pb-4">
            <h3 className="font-sans text-xs font-extrabold text-brand-text uppercase mb-2 flex items-center gap-2">
              <span className="text-brand-accent">▪</span> O que é o algoritmo adaptativo inteligente de qualidade?
            </h3>
            <p className="text-zinc-400">
              Diferente de compressores genéricos que aplicam uma taxa fixa de qualidade de compressão em todos os arquivos (o que pode estragar imagens detalhadas), nossa ferramenta analisa a estrutura e o perfil de cores da imagem na memória. Ela calibra a qualidade de conversão dinamicamente no intervalo de 75% a 85%, encontrando o limite onde a compressão é máxima sem gerar qualquer distorção visual perceptível ao olho humano.
            </p>
          </div>

          <div className="border-b border-brand-border/40 pb-4">
            <h3 className="font-sans text-xs font-extrabold text-brand-text uppercase mb-2 flex items-center gap-2">
              <span className="text-brand-accent">▪</span> Os meus arquivos ou fotos são enviados para algum servidor externo?
            </h3>
            <p className="text-zinc-400">
              Absolutamente não. A arquitetura do nosso portal foi desenvolvida sob o conceito de <span className="text-brand-text">Edge Privacy (Client-Side)</span>. Toda a leitura binária, conversão e compressão ocorrem localmente na memória RAM do seu navegador. Isso atende integralmente à LGPD (Lei Geral de Proteção de Dados) e a políticas rígidas de segurança corporativa contra vazamento de arquivos confidenciais na nuvem.
            </p>
          </div>

          <div>
            <h3 className="font-sans text-xs font-extrabold text-brand-text uppercase mb-2 flex items-center gap-2">
              <span className="text-brand-accent">▪</span> O conversor mantém a transparência (canal alpha) das imagens PNG?
            </h3>
            <p className="text-zinc-400">
              Sim. Ao contrário da conversão para formatos antigos como JPEG, o formato WebP retém 100% do canal de transparência alfa das suas imagens PNG originais, gerando um arquivo otimizado com transparência muito mais leve.
            </p>
          </div>
        </div>
      </section>

      {/* AdSense slot posicionado com distanciamento seguro (longe de áreas interativas) */}
      <AdSenseBanner slot="1111111111" />
    </div>
  );
}
