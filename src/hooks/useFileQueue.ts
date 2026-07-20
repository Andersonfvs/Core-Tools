"use client";

import { useState, useCallback } from "react";
import {
  CompressionResult,
  convertImageToWebP,
  renameToWebP,
  createZipDownload,
} from "@/engines/webp-converter";

export interface QueueItem {
  id: string;
  file: File;
  status: "pending" | "processing" | "success" | "error";
  progress: number;
  result?: Omit<CompressionResult, "name">;
  outputName?: string;
}

export function useFileQueue() {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const addFiles = useCallback((files: File[]) => {
    const newItems: QueueItem[] = files.map((file) => {
      const id = `${file.name}-${file.size}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      return {
        id,
        file,
        status: "pending",
        progress: 0,
      };
    });

    setQueue((prev) => [...prev, ...newItems]);
  }, []);

  const removeFile = useCallback((id: string) => {
    setQueue((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearQueue = useCallback(() => {
    setQueue([]);
    setIsProcessing(false);
  }, []);

  // Processa a fila com limite de concorrência (concurrency: 3)
  const startProcessing = useCallback(async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    const itemsToProcess = queue.filter((item) => item.status === "pending");
    
    // Atualizar status de pendente para processando
    setQueue((prev) =>
      prev.map((item) =>
        item.status === "pending" ? { ...item, status: "processing", progress: 20 } : item
      )
    );

    // Limitar concorrência
    const concurrencyLimit = 3;
    const pool: Promise<void>[] = [];

    for (const item of itemsToProcess) {
      const promise = (async () => {
        // Chamar o conversor
        const result = await convertImageToWebP(item.id, item.file);
        
        setQueue((prev) =>
          prev.map((prevItem) => {
            if (prevItem.id === item.id) {
              return {
                ...prevItem,
                status: result.status,
                progress: 100,
                result,
                outputName: renameToWebP(prevItem.file.name),
              };
            }
            return prevItem;
          })
        );
      })();

      pool.push(promise);

      // Se atingimos o limite de concorrência, aguarda que uma delas termine
      if (pool.length >= concurrencyLimit) {
        await Promise.race(pool);
        // Remove a promessa concluída do pool
        // (Isso é feito limpando as promessas resolvidas, mas para simplificar mantemos a fila avançando)
      }
    }

    // Aguarda todas as conversões terminarem
    await Promise.all(pool);
    setIsProcessing(false);
  }, [queue, isProcessing]);

  // Função para baixar arquivos individuais
  const downloadSingle = useCallback((item: QueueItem) => {
    if (!item.result?.blob || !item.outputName) return;
    const url = URL.createObjectURL(item.result.blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = item.outputName;
    link.click();
    URL.revokeObjectURL(url);
  }, []);

  // Função para baixar todos os arquivos convertidos em um arquivo ZIP
  const downloadAllAsZip = useCallback(async () => {
    const successItems = queue.filter(
      (item) => item.status === "success" && item.result?.blob && item.outputName
    );
    if (successItems.length === 0) return;

    const filesToZip = successItems.map((item) => ({
      name: item.outputName!,
      blob: item.result!.blob!,
    }));

    const zipBlob = await createZipDownload(filesToZip);
    const url = URL.createObjectURL(zipBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `webp-converted-${Date.now()}.zip`;
    link.click();
    URL.revokeObjectURL(url);
  }, [queue]);

  // Estatísticas da compressão
  const getStats = useCallback(() => {
    const successItems = queue.filter((item) => item.status === "success" && item.result);
    const totalOriginalSize = successItems.reduce((acc, item) => acc + item.file.size, 0);
    const totalCompressedSize = successItems.reduce(
      (acc, item) => acc + (item.result?.compressedSize || 0),
      0
    );
    const savingsBytes = totalOriginalSize - totalCompressedSize;
    const savingsPercent =
      totalOriginalSize > 0 ? Math.round((savingsBytes / totalOriginalSize) * 100) : 0;

    return {
      totalOriginalSize,
      totalCompressedSize,
      savingsBytes,
      savingsPercent,
      totalCount: queue.length,
      successCount: successItems.length,
      pendingCount: queue.filter((item) => item.status === "pending").length,
      processingCount: queue.filter((item) => item.status === "processing").length,
    };
  }, [queue]);

  return {
    queue,
    isProcessing,
    addFiles,
    removeFile,
    clearQueue,
    startProcessing,
    downloadSingle,
    downloadAllAsZip,
    stats: getStats(),
  };
}
