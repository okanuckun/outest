/**
 * Client-side image compression utility
 * Compresses images before upload to reduce file size and improve performance
 */

export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  outputFormat?: 'webp' | 'jpeg';
}

export interface CompressionResult {
  blob: Blob;
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
  width: number;
  height: number;
}

const DEFAULT_OPTIONS: Required<CompressionOptions> = {
  maxWidth: 1600,
  maxHeight: 2400,
  quality: 0.82,
  outputFormat: 'webp',
};

/**
 * Load an image file into an HTMLImageElement
 */
const loadImage = (file: File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(img.src);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(img.src);
      reject(new Error('Failed to load image'));
    };
    img.src = URL.createObjectURL(file);
  });
};

/**
 * Calculate new dimensions while maintaining aspect ratio
 */
const calculateDimensions = (
  originalWidth: number,
  originalHeight: number,
  maxWidth: number,
  maxHeight: number
): { width: number; height: number } => {
  let width = originalWidth;
  let height = originalHeight;

  // Scale down if exceeds max dimensions
  if (width > maxWidth) {
    height = Math.round((height * maxWidth) / width);
    width = maxWidth;
  }

  if (height > maxHeight) {
    width = Math.round((width * maxHeight) / height);
    height = maxHeight;
  }

  return { width, height };
};

/**
 * Compress a single image file
 */
export const compressImage = async (
  file: File,
  options: CompressionOptions = {}
): Promise<CompressionResult> => {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  
  // Load the image
  const img = await loadImage(file);
  
  // Calculate new dimensions
  const { width, height } = calculateDimensions(
    img.naturalWidth,
    img.naturalHeight,
    opts.maxWidth,
    opts.maxHeight
  );

  // Create canvas and draw resized image
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Failed to get canvas context');
  }

  // Use high-quality image smoothing
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  
  // Draw the image
  ctx.drawImage(img, 0, 0, width, height);

  // Convert to blob
  const mimeType = opts.outputFormat === 'webp' ? 'image/webp' : 'image/jpeg';
  
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (result) => {
        if (result) {
          resolve(result);
        } else {
          reject(new Error('Failed to create blob'));
        }
      },
      mimeType,
      opts.quality
    );
  });

  const originalSize = file.size;
  const compressedSize = blob.size;
  const compressionRatio = Math.round((1 - compressedSize / originalSize) * 100);

  return {
    blob,
    originalSize,
    compressedSize,
    compressionRatio,
    width,
    height,
  };
};

/**
 * Compress multiple images with progress callback
 */
export const compressImages = async (
  files: File[],
  options: CompressionOptions = {},
  onProgress?: (completed: number, total: number, currentFile: string) => void
): Promise<{ file: File; result: CompressionResult }[]> => {
  const results: { file: File; result: CompressionResult }[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    onProgress?.(i, files.length, file.name);
    
    try {
      const result = await compressImage(file, options);
      results.push({ file, result });
    } catch (error) {
      console.error(`Failed to compress ${file.name}:`, error);
      // Skip failed files but continue with others
    }
  }

  onProgress?.(files.length, files.length, 'Complete');
  return results;
};

/**
 * Format bytes to human readable string
 */
export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

/**
 * Check if a file is an image
 */
export const isImageFile = (file: File): boolean => {
  return file.type.startsWith('image/');
};

/**
 * Check if WebP is supported
 */
export const isWebPSupported = (): boolean => {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL('image/webp').startsWith('data:image/webp');
};
