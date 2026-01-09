import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  EyeOff
} from 'lucide-react';

interface PortfolioImage {
  id: string;
  storage_path: string;
  url: string;
  display_order: number;
  is_visible: boolean;
}

interface SortableImageProps {
  image: PortfolioImage;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onToggleVisibility: () => void;
  onOrderChange: (newOrder: number) => void;
}

const SortableImage: React.FC<SortableImageProps> = ({ 
  image, 
  index,
  isSelected, 
  onSelect, 
  onDelete,
  onToggleVisibility,
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
        alt={image.storage_path}
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
  const [uploadProgress, setUploadProgress] = useState<{ total: number; completed: number }>({ total: 0, completed: 0 });
  const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set());
  const [deleting, setDeleting] = useState(false);
  const [saving, setSaving] = useState(false);

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

    setUploading(true);
    setUploadProgress({ total: files.length, completed: 0 });

    const maxOrder = Math.max(0, ...images.map(img => img.display_order));

    const uploadPromises = Array.from(files).map(async (file, index) => {
      const fileExt = file.name.split('.').pop()?.toLowerCase();
      const fileName = `${Date.now()}-${index}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error(`Error uploading ${file.name}:`, uploadError);
        return { success: false, name: file.name, error: uploadError.message };
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
        return { success: false, name: file.name, error: insertError.message };
      }

      setUploadProgress(prev => ({ ...prev, completed: prev.completed + 1 }));
      return { success: true, name: file.name };
    });

    const results = await Promise.all(uploadPromises);
    const successCount = results.filter(r => r.success).length;
    const failCount = results.filter(r => !r.success).length;

    setUploading(false);
    setUploadProgress({ total: 0, completed: 0 });

    if (successCount > 0) {
      toast({
        title: 'Upload Complete',
        description: `${successCount} image(s) uploaded${failCount > 0 ? `, ${failCount} failed` : ''}`,
      });
      fetchImages();
    } else {
      toast({
        title: 'Upload Failed',
        description: 'No images were uploaded',
        variant: 'destructive',
      });
    }

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

        <div className="flex gap-2 flex-wrap">
          {/* Upload button */}
          <div className="relative">
            <Input
              type="file"
              accept="image/*,.webp"
              multiple
              onChange={handleFileUpload}
              disabled={uploading}
              className="absolute inset-0 opacity-0 cursor-pointer"
              id="portfolio-upload"
            />
            <Button disabled={uploading} className="pointer-events-none">
              {uploading ? (
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
