// Web Worker for WebP Image Compression using OffscreenCanvas

addEventListener("message", async (event) => {
  const { id, file } = event.data;

  try {
    // 1. Create ImageBitmap from the image Blob (supported in workers)
    const imageBitmap = await createImageBitmap(file);
    const { width, height } = imageBitmap;

    // 2. Initialize OffscreenCanvas
    const canvas = new OffscreenCanvas(width, height);
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("Não foi possível obter o contexto 2D do OffscreenCanvas.");
    }

    // 3. Draw ImageBitmap to Canvas
    ctx.drawImage(imageBitmap, 0, 0);
    // Release the ImageBitmap memory
    imageBitmap.close();

    // 4. Adaptive Compression Algorithm
    // Target threshold: ~0.22 bytes per pixel for high visual detail
    const pixels = width * height;
    const targetMaxBytes = pixels * 0.22;
    
    let quality = 0.85;
    let compressedBlob = await canvas.convertToBlob({
      type: "image/webp",
      quality: quality,
    });

    // If the compressed size is larger than the target, try a lower quality (0.75) to optimize
    if (compressedBlob.size > targetMaxBytes && file.size > targetMaxBytes) {
      quality = 0.75;
      const optimizedBlob = await canvas.convertToBlob({
        type: "image/webp",
        quality: quality,
      });

      // Use the optimized one if it actually saved space
      if (optimizedBlob.size < compressedBlob.size) {
        compressedBlob = optimizedBlob;
      } else {
        quality = 0.85; // Fallback to 0.85 if no saving
      }
    }

    // 5. Send results back to main thread
    postMessage({
      id,
      status: "success",
      blob: compressedBlob,
      originalSize: file.size,
      compressedSize: compressedBlob.size,
      qualityUsed: quality,
      width,
      height,
    });
  } catch (error: any) {
    postMessage({
      id,
      status: "error",
      error: error?.message || "Erro desconhecido na conversão WebP.",
    });
  }
});
