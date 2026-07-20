import JSZip from "jszip";

export interface CompressionResult {
  id: string;
  name: string;
  status: "success" | "error";
  blob?: Blob;
  originalSize: number;
  compressedSize?: number;
  qualityUsed?: number;
  width?: number;
  height?: number;
  error?: string;
}

// Helper to rename files to .webp extension
export function renameToWebP(filename: string): string {
  const lastDotIdx = filename.lastIndexOf(".");
  const baseName = lastDotIdx !== -1 ? filename.substring(0, lastDotIdx) : filename;
  return `${baseName}.webp`;
}

// Orquestrador da conversão individual de imagem via Web Worker
export function convertImageToWebP(
  id: string,
  file: File
): Promise<Omit<CompressionResult, "name">> {
  return new Promise((resolve) => {
    // 1. Instanciar o Web Worker nativamente com suporte Next.js / Webpack
    const worker = new Worker(
      new URL("./webp.worker.ts", import.meta.url),
      { type: "module" } // Habilita suporte a TypeScript/ESM no worker
    );

    worker.onmessage = (event) => {
      const data = event.data;
      if (data.id === id) {
        resolve(data);
        worker.terminate(); // Finalizar o worker imediatamente após o resultado
      }
    };

    worker.onerror = (err) => {
      resolve({
        id,
        status: "error",
        originalSize: file.size,
        error: err.message || "Erro na execução do Worker.",
      });
      worker.terminate();
    };

    // Iniciar processamento no worker
    worker.postMessage({ id, file });
  });
}

// Cria um download em lote empacotado em .zip a partir das imagens processadas
export async function createZipDownload(
  results: { name: string; blob: Blob }[]
): Promise<Blob> {
  const zip = new JSZip();

  results.forEach((item) => {
    zip.file(item.name, item.blob);
  });

  return await zip.generateAsync({
    type: "blob",
    compression: "DEFLATE",
    compressionOptions: {
      level: 6, // Equilíbrio entre velocidade de compressão e tamanho
    },
  });
}
