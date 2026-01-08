import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Upload, 
  Trash2, 
  Image as ImageIcon,
  Loader2,
  CheckCircle,
  X
} from 'lucide-react';

interface PortfolioImage {
  name: string;
  url: string;
  created_at: string;
}

const PortfolioManager: React.FC = () => {
  const { toast } = useToast();
  const [images, setImages] = useState<PortfolioImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ total: number; completed: number }>({ total: 0, completed: 0 });
  const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set());
  const [deleting, setDeleting] = useState(false);

  const fetchImages = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.storage
        .from('portfolio')
        .list('', {
          limit: 500,
          sortBy: { column: 'created_at', order: 'desc' }
        });

      if (error) throw error;

      const imageList: PortfolioImage[] = (data || [])
        .filter(file => file.name !== '.emptyFolderPlaceholder')
        .map(file => ({
          name: file.name,
          url: supabase.storage.from('portfolio').getPublicUrl(file.name).data.publicUrl,
          created_at: file.created_at || ''
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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setUploadProgress({ total: files.length, completed: 0 });

    const uploadPromises = Array.from(files).map(async (file, index) => {
      const fileExt = file.name.split('.').pop()?.toLowerCase();
      const fileName = `${Date.now()}-${index}.${fileExt}`;

      const { error } = await supabase.storage
        .from('portfolio')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error(`Error uploading ${file.name}:`, error);
        return { success: false, name: file.name, error: error.message };
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
        description: `${successCount} image(s) uploaded successfully${failCount > 0 ? `, ${failCount} failed` : ''}`,
      });
      fetchImages();
    } else {
      toast({
        title: 'Upload Failed',
        description: 'No images were uploaded',
        variant: 'destructive',
      });
    }

    // Reset input
    e.target.value = '';
  };

  const toggleImageSelection = (imageName: string) => {
    setSelectedImages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(imageName)) {
        newSet.delete(imageName);
      } else {
        newSet.add(imageName);
      }
      return newSet;
    });
  };

  const selectAll = () => {
    if (selectedImages.size === images.length) {
      setSelectedImages(new Set());
    } else {
      setSelectedImages(new Set(images.map(img => img.name)));
    }
  };

  const deleteSelectedImages = async () => {
    if (selectedImages.size === 0) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${selectedImages.size} image(s)? This action cannot be undone.`
    );

    if (!confirmDelete) return;

    setDeleting(true);

    const filesToDelete = Array.from(selectedImages);
    const { error } = await supabase.storage
      .from('portfolio')
      .remove(filesToDelete);

    setDeleting(false);

    if (error) {
      toast({
        title: 'Delete Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Deleted',
        description: `${filesToDelete.length} image(s) deleted successfully`,
      });
      setSelectedImages(new Set());
      fetchImages();
    }
  };

  const deleteSingleImage = async (imageName: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this image?');
    if (!confirmDelete) return;

    const { error } = await supabase.storage
      .from('portfolio')
      .remove([imageName]);

    if (error) {
      toast({
        title: 'Delete Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({ title: 'Image deleted' });
      fetchImages();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-lg font-medium text-foreground">Portfolio Images</h2>
          <p className="text-sm text-muted-foreground">
            {images.length} image(s) in portfolio
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
                  Uploading {uploadProgress.completed}/{uploadProgress.total}
                </>
              ) : (
                <>
                  <Upload size={16} className="mr-2" />
                  Upload Images
                </>
              )}
            </Button>
          </div>

          {/* Select all button */}
          {images.length > 0 && (
            <Button variant="outline" onClick={selectAll}>
              {selectedImages.size === images.length ? 'Deselect All' : 'Select All'}
            </Button>
          )}

          {/* Delete selected button */}
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

      {/* Image grid */}
      {!loading && images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {images.map((image) => (
            <div
              key={image.name}
              className={`relative group aspect-square rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                selectedImages.has(image.name)
                  ? 'border-primary ring-2 ring-primary/50'
                  : 'border-border hover:border-muted-foreground'
              }`}
              onClick={() => toggleImageSelection(image.name)}
            >
              <img
                src={image.url}
                alt={image.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              
              {/* Selection indicator */}
              {selectedImages.has(image.name) && (
                <div className="absolute top-2 left-2 bg-primary text-primary-foreground rounded-full p-1">
                  <CheckCircle size={16} />
                </div>
              )}

              {/* Hover overlay with delete button */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteSingleImage(image.name);
                  }}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PortfolioManager;
