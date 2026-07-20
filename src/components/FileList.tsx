"use client";

import React from "react";
import { QueueItem } from "@/hooks/useFileQueue";
import ProgressBar from "./ProgressBar";

interface FileListProps {
  queue: QueueItem[];
  isProcessing: boolean;
  stats: {
    totalOriginalSize: number;
    totalCompressedSize: number;
    savingsBytes: number;
    savingsPercent: number;
    totalCount: number;
    successCount: number;
    pendingCount: number;
    processingCount: number;
  };
  removeFile: (id: string) => void;
  downloadSingle: (item: QueueItem) => void;
  downloadAllAsZip: () => void;
  startProcessing: () => void;
  clearQueue: () => void;
  color?: "cyan" | "pink";
}

export function formatBytes(bytes: number, decimals = 1) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export default function FileList({
  queue,
  isProcessing,
  stats,
  removeFile,
  downloadSingle,
  downloadAllAsZip,
  startProcessing,
  clearQueue,
}: FileListProps) {
  if (queue.length === 0) return null;

  return (
    <div className="w-full mt-6 bg-brand-panel/30 border border-brand-border p-6 relative font-mono text-xs text-brand-text">
      {/* Draft corner marks */}
      <span className="absolute top-1 left-2 font-mono text-[9px] text-zinc-700 select-none">[//]</span>
      <span className="absolute bottom-1 right-2 font-mono text-[9px] text-zinc-700 select-none">[//]</span>

      {/* Header Info & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-brand-border pb-4 mb-5">
        <div>
          <span className="text-zinc-500 uppercase tracking-widest text-[10px] block mb-1">Queue Status</span>
          <span className="font-bold text-sm tracking-wide">{stats.totalCount} arquivos carregados</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {stats.pendingCount > 0 && (
            <button
              onClick={startProcessing}
              disabled={isProcessing}
              className="px-4 py-1.5 btn-tactile-accent text-xs uppercase tracking-wider cursor-pointer"
            >
              Iniciar Otimização
            </button>
          )}

          {stats.successCount > 0 && (
            <button
              onClick={downloadAllAsZip}
              className="px-4 py-1.5 btn-tactile text-xs uppercase tracking-wider border-brand-accent/50 text-brand-accent hover:bg-brand-accent hover:text-black cursor-pointer"
            >
              Baixar ZIP ({stats.successCount})
            </button>
          )}

          <button
            onClick={clearQueue}
            className="px-4 py-1.5 btn-tactile text-xs uppercase tracking-wider cursor-pointer"
          >
            Limpar Fila
          </button>
        </div>
      </div>

      {/* Queue list table */}
      <div className="max-h-72 overflow-y-auto space-y-3 pr-1">
        {queue.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row md:items-center justify-between border border-brand-border p-3 bg-brand-bg/40"
          >
            {/* File Info */}
            <div className="flex-grow min-w-0 pr-4 mb-2.5 md:mb-0">
              <div className="flex justify-between items-center gap-2 mb-1">
                <span className="font-semibold text-zinc-200 truncate block" title={item.file.name}>
                  {item.file.name}
                </span>
                <span className="text-brand-muted shrink-0">
                  {formatBytes(item.file.size)}
                </span>
              </div>

              {/* Progress */}
              {item.status === "processing" && (
                <div className="w-full mt-2">
                  <ProgressBar progress={item.progress} showText={false} />
                </div>
              )}

              {/* Decompressed/Converted stats */}
              {item.status === "success" && item.result && (
                <div className="text-[10px] text-brand-muted flex flex-wrap gap-x-3 gap-y-1 mt-1">
                  <span>
                    Original: <span className="text-zinc-300">{formatBytes(item.result.originalSize)}</span>
                  </span>
                  <span>
                    Saída:{" "}
                    <span className="text-brand-accent font-semibold">
                      {formatBytes(item.result.compressedSize || 0)}
                    </span>
                  </span>
                  <span>
                    Redução:{" "}
                    <span className="text-brand-accent font-semibold">
                      -{Math.round(((item.file.size - (item.result.compressedSize || 0)) / item.file.size) * 100)}%
                    </span>
                  </span>
                  <span>
                    Qualidade:{" "}
                    <span className="text-zinc-300">
                      {Math.round((item.result.qualityUsed || 0.85) * 100)}%
                    </span>
                  </span>
                </div>
              )}

              {item.status === "error" && (
                <div className="text-[10px] text-red-500 font-bold mt-1">
                  Falha: {item.result?.error || "Erro de processamento."}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2 justify-end shrink-0">
              {item.status === "success" && (
                <button
                  onClick={() => downloadSingle(item)}
                  className="px-3 py-1 btn-tactile text-[10px] font-bold uppercase cursor-pointer"
                >
                  Baixar
                </button>
              )}

              <button
                onClick={() => removeFile(item.id)}
                className="px-3 py-1 btn-tactile text-[10px] uppercase cursor-pointer"
              >
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Consolidated stats block */}
      {stats.successCount > 0 && (
        <div className="border-t border-brand-border pt-4 mt-5 grid grid-cols-2 md:grid-cols-4 gap-4 text-[10px] text-brand-muted">
          <div>
            <span className="block uppercase text-zinc-500 mb-0.5">Tamanho Original:</span>
            <span className="text-zinc-300 font-semibold text-xs">{formatBytes(stats.totalOriginalSize)}</span>
          </div>
          <div>
            <span className="block uppercase text-zinc-500 mb-0.5">Tamanho Comprimido:</span>
            <span className="text-brand-accent font-semibold text-xs">{formatBytes(stats.totalCompressedSize)}</span>
          </div>
          <div>
            <span className="block uppercase text-zinc-500 mb-0.5">Volume Salvo:</span>
            <span className="text-zinc-300 font-semibold text-xs">{formatBytes(stats.savingsBytes)}</span>
          </div>
          <div>
            <span className="block uppercase text-zinc-500 mb-0.5">Taxa de Redução:</span>
            <span className="text-brand-accent font-bold text-xs bg-brand-accent/10 border border-brand-accent/20 px-1 py-0.5 rounded-sm">
              -{stats.savingsPercent}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
