import * as fflate from "fflate";
import { createExtractorFromData } from "node-unrar-js";

export interface ExtractedFile {
  name: string;
  size: number;
  isDirectory: boolean;
  content: Uint8Array;
}

// 1. Motor de Descompactação ZIP usando fflate
export function unzipArchive(file: File): Promise<ExtractedFile[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const uint8Array = new Uint8Array(arrayBuffer);

        // Decompress the ZIP synchronously (optimized client-side)
        const unzipped = fflate.unzipSync(uint8Array);

        const results: ExtractedFile[] = [];

        Object.entries(unzipped).forEach(([filePath, content]) => {
          const isDirectory = filePath.endsWith("/");
          results.push({
            name: filePath,
            size: content.length,
            isDirectory,
            content,
          });
        });

        resolve(results);
      } catch (err) {
        reject(new Error("Falha ao descompactar arquivo ZIP. Arquivo corrompido ou formato inválido."));
      }
    };

    reader.onerror = () => reject(new Error("Erro ao ler o arquivo ZIP."));
    reader.readAsArrayBuffer(file);
  });
}

// 2. Motor de Descompactação RAR usando node-unrar-js com WASM
export function unrarArchive(
  file: File,
  wasmBinary: ArrayBuffer
): Promise<ExtractedFile[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const rarData = new Uint8Array(arrayBuffer);

        // Create the extractor from the ArrayBuffer and the WASM binary
        const extractor = await createExtractorFromData({
          data: arrayBuffer,
          wasmBinary: wasmBinary,
        });

        // Extract all files
        const extractedResult = extractor.extract();

        let filesArray: any[] = [];
        
        // Handle variations in node-unrar-js API output formats
        if (extractedResult && (extractedResult as any).files) {
          filesArray = (extractedResult as any).files;
        } else if (
          Array.isArray(extractedResult) &&
          extractedResult[1] &&
          extractedResult[1].files
        ) {
          filesArray = extractedResult[1].files;
        } else if (
          Array.isArray(extractedResult) &&
          extractedResult[0] &&
          extractedResult[0].state === "SUCCESS" &&
          extractedResult[1]?.files
        ) {
          filesArray = extractedResult[1].files;
        } else {
          throw new Error("Formato de retorno do extrator RAR desconhecido.");
        }

        const results: ExtractedFile[] = [];

        filesArray.forEach((fileEntry: any) => {
          const name = fileEntry.fileHeader.name;
          const isDirectory = fileEntry.fileHeader.flags.directory;
          const size = fileEntry.fileHeader.unpSize;
          const content = fileEntry.extraction || new Uint8Array(0);

          results.push({
            name,
            size,
            isDirectory,
            content,
          });
        });

        resolve(results);
      } catch (err: any) {
        reject(new Error(err?.message || "Falha ao descompactar arquivo RAR."));
      }
    };

    reader.onerror = () => reject(new Error("Erro ao ler o arquivo RAR."));
    reader.readAsArrayBuffer(file);
  });
}
