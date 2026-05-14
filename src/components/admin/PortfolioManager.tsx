import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
  Upload, 
  Trash2, 
  Image as ImageIcon,
  Loader2,
  CheckCircle,
  GripVertical,
  Eye,
  EyeOff,
  Star,
  Zap,
  RefreshCw
} from 'lucide-react';
import { compressImage, formatBytes, isWebPSupported, type CompressionResult } from '@/lib/imageCompressor';

interface PortfolioImage {
  id: string;
  storage_path: string;
  url: string;
  display_order: number;
  is_visible: boolean;
  is_featured: boolean;
}

interface SortableImageProps {
  image: PortfolioImage;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onToggleVisibility: () => void;
  onToggleFeatured: () => void;
  onOrderChange: (newOrder: number) => void;
}

const SortableImage: React.FC<SortableImageProps> = ({ 
  image, 
  index,
  isSelected, 
  onSelect, 
  onDelete,
  onToggleVisibility,
  onToggleFeatured,
  onOrderChange
}) => {
  const [orderInput, setOrderInput] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: image.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 1,
  };

  const handleOrderSubmit = () => {
    const newOrder = parseInt(orderInput, 10);
    if (!isNaN(newOrder) && newOrder >= 1) {
      onOrderChange(newOrder - 1); // Convert to 0-indexed
    }
    setOrderInput('');
    setIsEditing(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group aspect-square rounded-lg overflow-hidden border-2 transition-all ${
        isSelected
          ? 'border-primary ring-2 ring-primary/50'
          : 'border-border hover:border-muted-foreground'
      } ${!image.is_visible ? 'opacity-50' : ''}`}
    >
      {/* Order number badge */}
      {isEditing ? (
        <div className="absolute top-2 left-2 z-20">
          <input
            type="number"
            min="1"
            value={orderInput}
            onChange={(e) => setOrderInput(e.target.value)}
            onBlur={handleOrderSubmit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleOrderSubmit();
              if (e.key === 'Escape') {
                setOrderInput('');
                setIsEditing(false);
              }
            }}
            autoFocus
            className="w-14 h-7 text-center text-sm font-medium bg-white border border-primary rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder={String(index + 1)}
          />
        </div>
      ) : (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsEditing(true);
            setOrderInput(String(index + 1));
          }}
          className="absolute top-2 left-2 z-10 bg-black/70 hover:bg-primary text-white text-xs font-bold rounded w-7 h-7 flex items-center justify-center transition-colors"
          title="Click to set order"
        >
          {index + 1}
        </button>
      )}

      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute top-2 right-2 z-10 bg-black/60 text-white rounded p-1 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <GripVertical size={16} />
      </div>

      <img
        src={image.url}
        // Admin-only thumbnail. Use the human description (caption/title) if
        // available; fall back to a generic descriptive alt rather than the
        // storage filename. Public portfolio surfaces use richer alts via
        // FeaturedWork / Work pages.
        alt={
          (image as { caption?: string; title?: string }).caption ||
          (image as { caption?: string; title?: string }).title ||
          'Okan Uckun portfolio tattoo image'
        }
        className="w-full h-full object-cover cursor-pointer"
        loading="lazy"
        onClick={onSelect}
      />
      
      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute top-2 left-2 bg-primary text-primary-foreground rounded-full p-1">
          <CheckCircle size={16} />
        </div>
      )}

      {/* Featured star indicator */}
      {image.is_featured && (
        <div className="absolute bottom-2 right-2 bg-yellow-500 text-black rounded-full p-1">
          <Star size={14} fill="currentColor" />
        </div>
      )}

      {/* Visibility indicator */}
      {!image.is_visible && (
        <div className="absolute bottom-2 left-2 bg-black/60 text-white rounded-full p-1">
          <EyeOff size={14} />
        </div>
      )}

      {/* Hover overlay with actions */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFeatured();
          }}
          className={image.is_featured ? 'bg-yellow-500 hover:bg-yellow-600 text-black' : ''}
          title={image.is_featured ? 'Remove from featured' : 'Add to featured'}
        >
          <Star size={16} fill={image.is_featured ? 'currentColor' : 'none'} />
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onToggleVisibility();
          }}
        >
          {image.is_visible ? <EyeOff size={16} /> : <Eye size={16} />}
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <Trash2 size={16} />
        </Button>
      </div>
    </div>
  );
};

const PortfolioManager: React.FC = () => {
  const { toast } = useToast();
  const [images, setImages] = useState<PortfolioImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [compressing, setCompressing] = useState(false);
  const [compressionStats, setCompressionStats] = useState<{ saved: number; total: number } | null>(null);
  const [uploadProgress, setUploadProgress] = useState<{ total: number; completed: number }>({ total: 0, completed: 0 });
  const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set());
  const [deleting, setDeleting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [bulkMoveTarget, setBulkMoveTarget] = useState<string>('');
  const [optimizing, setOptimizing] = useState(false);
  const [optimizeProgress, setOptimizeProgress] = useState<{ current: number; total: number; saved: number }>({ current: 0, total: 0, saved: 0 });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const fetchImages = useCallback(async () => {
    setLoading(true);
    try {
      // Get images from database with order
      const { data: dbImages, error: dbError } = await supabase
        .from('portfolio_images')
        .select('*')
        .order('display_order', { ascending: true });

      if (dbError) throw dbError;

      // List storage files (supports subfolders)
      const listAllPortfolioFiles = async (): Promise<{ name: string }[]> => {
        const results: { name: string }[] = [];
        const queue: string[] = [''];

        while (queue.length) {
          const prefix = queue.shift()!;

          const { data, error } = await supabase.storage
            .from('portfolio')
            .list(prefix, { limit: 500 });

          if (error) throw error;

          for (const item of data || []) {
            if (item.name === '.emptyFolderPlaceholder') continue;

            const fullName = prefix ? `${prefix}/${item.name}` : item.name;
            const isFolder = item.metadata === null;

            if (isFolder) {
              queue.push(fullName);
            } else {
              results.push({ name: fullName });
            }
          }
        }

        return results;
      };

      const storageFiles = await listAllPortfolioFiles();

      // Create a map of existing db records
      const dbMap = new Map((dbImages || []).map(img => [img.storage_path, img]));

      // Sync: Add new storage files to database
      const newFiles = (storageFiles || []).filter(file => !dbMap.has(file.name));

      if (newFiles.length > 0) {
        const maxOrder = Math.max(0, ...(dbImages || []).map(img => img.display_order));
        const newRecords = newFiles.map((file, index) => ({
          storage_path: file.name,
          display_order: maxOrder + index + 1,
          is_visible: true,
        }));

        const { error: insertError } = await supabase
          .from('portfolio_images')
          .insert(newRecords);

        if (insertError) throw insertError;
      }

      // Re-fetch after sync
      const { data: finalImages, error: finalError } = await supabase
        .from('portfolio_images')
        .select('*')
        .order('display_order', { ascending: true });

      if (finalError) throw finalError;

      // Filter out records where storage file no longer exists
      const storageSet = new Set((storageFiles || []).map(f => f.name));
      const validDbImages = (finalImages || []).filter(img => storageSet.has(img.storage_path));

      // Build final image list with URLs
      const imageList: PortfolioImage[] = validDbImages.map(img => ({
        id: img.id,
        storage_path: img.storage_path,
        url: supabase.storage.from('portfolio').getPublicUrl(img.storage_path).data.publicUrl,
        display_order: img.display_order,
        is_visible: img.is_visible ?? true,
        is_featured: img.is_featured ?? false,
      }));

      setImages(imageList);
    } catch (error: any) {
      toast({
        title: 'Error fetching images',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over || active.id === over.id) return;

    const oldIndex = images.findIndex(img => img.id === active.id);
    const newIndex = images.findIndex(img => img.id === over.id);

    const newImages = arrayMove(images, oldIndex, newIndex);
    setImages(newImages);

    // Save new order to database
    setSaving(true);
    try {
      const updates = newImages.map((img, index) => ({
        id: img.id,
        storage_path: img.storage_path,
        display_order: index,
        is_visible: img.is_visible,
      }));

      for (const update of updates) {
        await supabase
          .from('portfolio_images')
          .update({ display_order: update.display_order })
          .eq('id', update.id);
      }

      toast({ title: 'Order saved' });
    } catch (error: any) {
      toast({
        title: 'Error saving order',
        description: error.message,
        variant: 'destructive',
      });
      fetchImages(); // Revert on error
    } finally {
      setSaving(false);
    }
  };

  const handleOrderChange = async (imageId: string, currentIndex: number, targetIndex: number) => {
    if (targetIndex < 0 || targetIndex >= images.length || currentIndex === targetIndex) return;

    const newImages = arrayMove(images, currentIndex, targetIndex);
    setImages(newImages);

    // Save new order to database
    setSaving(true);
    try {
      const updates = newImages.map((img, index) => ({
        id: img.id,
        display_order: index,
      }));

      for (const update of updates) {
        await supabase
          .from('portfolio_images')
          .update({ display_order: update.display_order })
          .eq('id', update.id);
      }

      toast({ title: 'Order updated' });
    } catch (error: any) {
      toast({
        title: 'Error saving order',
        description: error.message,
        variant: 'destructive',
      });
      fetchImages();
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    
    // Step 1: Compress images
    setCompressing(true);
    setCompressionStats(null);
    
    const compressedFiles: { originalFile: File; blob: Blob; stats: CompressionResult }[] = [];
    let totalOriginalSize = 0;
    let totalCompressedSize = 0;

    const useWebP = isWebPSupported();
    
    for (const file of fileArray) {
      try {
        const result = await compressImage(file, {
          maxWidth: 1600,
          maxHeight: 2400,
          quality: 0.82,
          outputFormat: useWebP ? 'webp' : 'jpeg',
        });
        
        compressedFiles.push({
          originalFile: file,
          blob: result.blob,
          stats: result,
        });
        
        totalOriginalSize += result.originalSize;
        totalCompressedSize += result.compressedSize;
      } catch (error) {
        console.error(`Failed to compress ${file.name}:`, error);
        // Use original file if compression fails
        compressedFiles.push({
          originalFile: file,
          blob: file,
          stats: {
            blob: file,
            originalSize: file.size,
            compressedSize: file.size,
            compressionRatio: 0,
            width: 0,
            height: 0,
          },
        });
        totalOriginalSize += file.size;
        totalCompressedSize += file.size;
      }
    }

    setCompressing(false);
    setCompressionStats({
      saved: totalOriginalSize - totalCompressedSize,
      total: totalOriginalSize,
    });

    // Step 2: Upload compressed images
    setUploading(true);
    setUploadProgress({ total: compressedFiles.length, completed: 0 });

    const maxOrder = Math.max(0, ...images.map(img => img.display_order));
    const fileExt = useWebP ? 'webp' : 'jpg';

    const uploadPromises = compressedFiles.map(async ({ blob, originalFile }, index) => {
      const fileName = `${Date.now()}-${index}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio')
        .upload(fileName, blob, {
          cacheControl: '3600',
          upsert: false,
          contentType: useWebP ? 'image/webp' : 'image/jpeg',
        });

      if (uploadError) {
        console.error(`Error uploading ${originalFile.name}:`, uploadError);
        return { success: false, name: originalFile.name, error: uploadError.message };
      }

      // Add to database
      const { error: insertError } = await supabase.from('portfolio_images').insert({
        storage_path: fileName,
        display_order: maxOrder + index + 1,
        is_visible: true,
      });

      if (insertError) {
        // Keep storage + DB in sync (avoid orphan files)
        await supabase.storage.from('portfolio').remove([fileName]);
        return { success: false, name: originalFile.name, error: insertError.message };
      }

      setUploadProgress(prev => ({ ...prev, completed: prev.completed + 1 }));
      return { success: true, name: originalFile.name };
    });

    const results = await Promise.all(uploadPromises);
    const successCount = results.filter(r => r.success).length;
    const failCount = results.filter(r => !r.success).length;

    setUploading(false);
    setUploadProgress({ total: 0, completed: 0 });

    const savedMB = ((totalOriginalSize - totalCompressedSize) / 1024 / 1024).toFixed(1);
    const compressionPercent = Math.round((1 - totalCompressedSize / totalOriginalSize) * 100);

    if (successCount > 0) {
      toast({
        title: 'Upload Complete',
        description: `${successCount} image(s) uploaded${failCount > 0 ? `, ${failCount} failed` : ''}. Saved ${savedMB}MB (${compressionPercent}% smaller)`,
      });
      fetchImages();
    } else {
      toast({
        title: 'Upload Failed',
        description: 'No images were uploaded',
        variant: 'destructive',
      });
    }

    // Clear stats after a delay
    setTimeout(() => setCompressionStats(null), 5000);
    e.target.value = '';
  };

  const toggleImageSelection = (imageId: string) => {
    setSelectedImages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(imageId)) {
        newSet.delete(imageId);
      } else {
        newSet.add(imageId);
      }
      return newSet;
    });
  };

  const selectAll = () => {
    if (selectedImages.size === images.length) {
      setSelectedImages(new Set());
    } else {
      setSelectedImages(new Set(images.map(img => img.id)));
    }
  };

  const toggleVisibility = async (image: PortfolioImage) => {
    const newVisibility = !image.is_visible;
    
    // Optimistic update
    setImages(prev => prev.map(img => 
      img.id === image.id ? { ...img, is_visible: newVisibility } : img
    ));

    const { error } = await supabase
      .from('portfolio_images')
      .update({ is_visible: newVisibility })
      .eq('id', image.id);

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
      fetchImages();
    }
  };

  const toggleFeatured = async (image: PortfolioImage) => {
    const newFeatured = !image.is_featured;
    
    // Optimistic update
    setImages(prev => prev.map(img => 
      img.id === image.id ? { ...img, is_featured: newFeatured } : img
    ));

    const { error } = await supabase
      .from('portfolio_images')
      .update({ is_featured: newFeatured })
      .eq('id', image.id);

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
      fetchImages();
    } else {
      toast({
        title: newFeatured ? 'Added to featured' : 'Removed from featured',
      });
    }
  };

  const deleteSelectedImages = async () => {
    if (selectedImages.size === 0) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${selectedImages.size} image(s)? This action cannot be undone.`
    );

    if (!confirmDelete) return;

    setDeleting(true);

    const imagesToDelete = images.filter(img => selectedImages.has(img.id));
    const storagePaths = imagesToDelete.map(img => img.storage_path);
    const dbIds = imagesToDelete.map(img => img.id);

    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from('portfolio')
      .remove(storagePaths);

    if (storageError) {
      toast({
        title: 'Storage Delete Error',
        description: storageError.message,
        variant: 'destructive',
      });
    }

    // Delete from database
    for (const id of dbIds) {
      await supabase.from('portfolio_images').delete().eq('id', id);
    }

    setDeleting(false);
    toast({
      title: 'Deleted',
      description: `${imagesToDelete.length} image(s) deleted`,
    });
    setSelectedImages(new Set());
    fetchImages();
  };

  const handleBulkMove = async () => {
    const targetPosition = parseInt(bulkMoveTarget, 10);
    if (isNaN(targetPosition) || targetPosition < 1 || selectedImages.size === 0) return;

    const targetIndex = Math.min(targetPosition - 1, images.length - 1);
    
    // Get selected images in their current order
    const selectedIds = Array.from(selectedImages);
    const selectedInOrder = images.filter(img => selectedIds.includes(img.id));
    const remaining = images.filter(img => !selectedIds.includes(img.id));
    
    // Insert selected images at target position
    const newImages = [
      ...remaining.slice(0, targetIndex),
      ...selectedInOrder,
      ...remaining.slice(targetIndex),
    ];

    setImages(newImages);
    setBulkMoveTarget('');

    // Save new order to database
    setSaving(true);
    try {
      for (let i = 0; i < newImages.length; i++) {
        await supabase
          .from('portfolio_images')
          .update({ display_order: i })
          .eq('id', newImages[i].id);
      }

      toast({ title: `${selectedImages.size} image(s) moved to position ${targetPosition}` });
      setSelectedImages(new Set());
    } catch (error: any) {
      toast({
        title: 'Error saving order',
        description: error.message,
        variant: 'destructive',
      });
      fetchImages();
    } finally {
      setSaving(false);
    }
  };

  const deleteSingleImage = async (image: PortfolioImage) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this image?');
    if (!confirmDelete) return;

    // Delete from storage
    await supabase.storage.from('portfolio').remove([image.storage_path]);
    
    // Delete from database
    await supabase.from('portfolio_images').delete().eq('id', image.id);

    toast({ title: 'Image deleted' });
    fetchImages();
  };

  // Optimize existing images - download, compress, re-upload
  const optimizeExistingImages = async () => {
    if (images.length === 0) return;

    const confirmOptimize = window.confirm(
      `Bu işlem ${images.length} görseli sıkıştıracak. Görseller değiştirilmeyecek, sadece boyutları küçültülecek. Devam etmek istiyor musunuz?`
    );

    if (!confirmOptimize) return;

    setOptimizing(true);
    setOptimizeProgress({ current: 0, total: images.length, saved: 0 });

    const useWebP = isWebPSupported();
    let totalSaved = 0;
    let optimizedCount = 0;
    let skippedCount = 0;

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      setOptimizeProgress(prev => ({ ...prev, current: i + 1 }));

      try {
        // Download the image
        const response = await fetch(image.url);
        if (!response.ok) {
          console.error(`Failed to fetch ${image.storage_path}`);
          skippedCount++;
          continue;
        }

        const originalBlob = await response.blob();
        const originalSize = originalBlob.size;

        // Skip if already small (under 200KB)
        if (originalSize < 200 * 1024) {
          skippedCount++;
          continue;
        }

        // Create a File object from blob for compression
        const file = new File([originalBlob], image.storage_path, { type: originalBlob.type });

        // Compress the image
        const result = await compressImage(file, {
          maxWidth: 1600,
          maxHeight: 2400,
          quality: 0.82,
          outputFormat: useWebP ? 'webp' : 'jpeg',
        });

        // Only re-upload if we saved at least 10%
        if (result.compressionRatio < 10) {
          skippedCount++;
          continue;
        }

        // Generate new filename with proper extension
        const newExt = useWebP ? 'webp' : 'jpg';
        const baseName = image.storage_path.replace(/\.[^/.]+$/, '');
        const newFileName = `${baseName}-opt.${newExt}`;

        // Upload the compressed image with new name
        const { error: uploadError } = await supabase.storage
          .from('portfolio')
          .upload(newFileName, result.blob, {
            cacheControl: '31536000',
            upsert: true,
            contentType: useWebP ? 'image/webp' : 'image/jpeg',
          });

        if (uploadError) {
          console.error(`Failed to upload optimized ${image.storage_path}:`, uploadError);
          skippedCount++;
          continue;
        }

        // Update database to point to new file
        const { error: updateError } = await supabase
          .from('portfolio_images')
          .update({ storage_path: newFileName })
          .eq('id', image.id);

        if (updateError) {
          console.error(`Failed to update database for ${image.storage_path}:`, updateError);
          // Clean up the uploaded file
          await supabase.storage.from('portfolio').remove([newFileName]);
          skippedCount++;
          continue;
        }

        // Delete old file
        await supabase.storage.from('portfolio').remove([image.storage_path]);

        totalSaved += (originalSize - result.compressedSize);
        optimizedCount++;
        setOptimizeProgress(prev => ({ ...prev, saved: totalSaved }));

      } catch (error) {
        console.error(`Error optimizing ${image.storage_path}:`, error);
        skippedCount++;
      }
    }

    setOptimizing(false);

    const savedMB = (totalSaved / 1024 / 1024).toFixed(1);

    if (optimizedCount > 0) {
      toast({
        title: 'Optimizasyon Tamamlandı',
        description: `${optimizedCount} görsel optimize edildi, ${savedMB}MB tasarruf sağlandı. ${skippedCount} görsel atlandı (zaten optimize).`,
      });
      fetchImages();
    } else {
      toast({
        title: 'Optimizasyon Tamamlandı',
        description: 'Tüm görseller zaten optimize durumda.',
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-lg font-medium text-foreground">Portfolio Images</h2>
          <p className="text-sm text-muted-foreground">
            {images.length} image(s) • Drag to reorder
            {saving && <span className="ml-2 text-primary">Saving...</span>}
          </p>
        </div>

        <div className="flex gap-2 flex-wrap items-center">
          {/* Compression status */}
          {compressing && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted px-3 py-1.5 rounded-md">
              <Loader2 size={14} className="animate-spin" />
              <span>Compressing images...</span>
            </div>
          )}
          
          {compressionStats && !compressing && !uploading && (
            <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-1.5 rounded-md">
              <Zap size={14} />
              <span>Saved {formatBytes(compressionStats.saved)} ({Math.round((compressionStats.saved / compressionStats.total) * 100)}%)</span>
            </div>
          )}

          {/* Optimize existing images button */}
          {images.length > 0 && (
            <Button 
              variant="outline" 
              onClick={optimizeExistingImages}
              disabled={optimizing || uploading || compressing}
              className="border-orange-500 text-orange-600 hover:bg-orange-50"
            >
              {optimizing ? (
                <>
                  <RefreshCw size={16} className="mr-2 animate-spin" />
                  {optimizeProgress.current}/{optimizeProgress.total} ({formatBytes(optimizeProgress.saved)} saved)
                </>
              ) : (
                <>
                  <RefreshCw size={16} className="mr-2" />
                  Optimize All
                </>
              )}
            </Button>
          )}

          {/* Upload button */}
          <div className="relative">
            <Input
              type="file"
              accept="image/*,.webp"
              multiple
              onChange={handleFileUpload}
              disabled={uploading || compressing || optimizing}
              className="absolute inset-0 opacity-0 cursor-pointer"
              id="portfolio-upload"
            />
            <Button disabled={uploading || compressing || optimizing} className="pointer-events-none">
              {compressing ? (
                <>
                  <Zap size={16} className="mr-2" />
                  Compressing...
                </>
              ) : uploading ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" />
                  {uploadProgress.completed}/{uploadProgress.total}
                </>
              ) : (
                <>
                  <Upload size={16} className="mr-2" />
                  Upload
                </>
              )}
            </Button>
          </div>

          {images.length > 0 && (
            <Button variant="outline" onClick={selectAll}>
              {selectedImages.size === images.length ? 'Deselect' : 'Select All'}
            </Button>
          )}

          {selectedImages.size > 0 && (
            <>
              {/* Bulk move controls */}
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min="1"
                  max={images.length}
                  placeholder="Position"
                  value={bulkMoveTarget}
                  onChange={(e) => setBulkMoveTarget(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleBulkMove();
                  }}
                  className="w-24 h-9"
                />
                <Button 
                  variant="secondary" 
                  onClick={handleBulkMove}
                  disabled={!bulkMoveTarget || saving}
                >
                  Move ({selectedImages.size})
                </Button>
              </div>

              <Button 
                variant="destructive" 
                onClick={deleteSelectedImages}
                disabled={deleting}
              >
                {deleting ? (
                  <Loader2 size={16} className="mr-2 animate-spin" />
                ) : (
                  <Trash2 size={16} className="mr-2" />
                )}
                Delete ({selectedImages.size})
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 size={32} className="animate-spin text-muted-foreground" />
        </div>
      )}

      {/* Empty state */}
      {!loading && images.length === 0 && (
        <div className="text-center py-12 border border-dashed border-border rounded-lg">
          <ImageIcon size={48} className="mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium text-foreground mb-2">No images yet</h3>
          <p className="text-muted-foreground mb-4">
            Upload your tattoo work images to get started
          </p>
          <div className="relative inline-block">
            <Input
              type="file"
              accept="image/*,.webp"
              multiple
              onChange={handleFileUpload}
              disabled={uploading}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <Button className="pointer-events-none">
              <Upload size={16} className="mr-2" />
              Upload Images
            </Button>
          </div>
        </div>
      )}

      {/* Sortable Image grid */}
      {!loading && images.length > 0 && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={images.map(img => img.id)} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {images.map((image, index) => (
                <SortableImage
                  key={image.id}
                  image={image}
                  index={index}
                  isSelected={selectedImages.has(image.id)}
                  onSelect={() => toggleImageSelection(image.id)}
                  onDelete={() => deleteSingleImage(image)}
                  onToggleVisibility={() => toggleVisibility(image)}
                  onToggleFeatured={() => toggleFeatured(image)}
                  onOrderChange={(targetIndex) => handleOrderChange(image.id, index, targetIndex)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
};

export default PortfolioManager;
