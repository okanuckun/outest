import React, { useRef, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Heading1, 
  Heading2, 
  Heading3,
  Quote,
  Undo,
  Redo,
  Code,
  Minus,
  ImageIcon,
  Loader2,
  Upload
} from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  content,
  onChange,
  placeholder = 'Start writing...',
  className,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg',
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[200px] px-3 py-2',
      },
    },
  });

  const handleImageUpload = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB');
      return;
    }

    setUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `editor/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('content-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('content-images')
        .getPublicUrl(filePath);

      if (editor) {
        editor.chain().focus().setImage({ src: publicUrl }).run();
      }

      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  }, [editor]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
    e.target.value = '';
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      handleImageUpload(imageFile);
    }
  }, [handleImageUpload]);

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    
    for (const item of items) {
      if (item.type.startsWith('image/')) {
        e.preventDefault();
        const file = item.getAsFile();
        if (file) {
          handleImageUpload(file);
        }
        break;
      }
    }
  }, [handleImageUpload]);

  if (!editor) {
    return null;
  }

  return (
    <div 
      className={cn(
        'border border-border rounded-md overflow-hidden bg-background relative',
        isDragging && 'ring-2 ring-primary ring-offset-2',
        className
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onPaste={handlePaste}
    >
      {/* Drag overlay */}
      {isDragging && (
        <div className="absolute inset-0 bg-primary/10 z-50 flex items-center justify-center pointer-events-none">
          <div className="bg-background border-2 border-dashed border-primary rounded-lg p-6 flex flex-col items-center gap-2">
            <Upload className="h-8 w-8 text-primary" />
            <span className="text-sm font-medium text-primary">Drop image here</span>
          </div>
        </div>
      )}

      {/* Upload indicator */}
      {uploading && (
        <div className="absolute inset-0 bg-background/80 z-50 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <span className="text-sm font-medium">Uploading image...</span>
          </div>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={onFileChange}
        className="hidden"
      />

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-border bg-muted/30">
        {/* Headings */}
        <Toggle
          size="sm"
          pressed={editor.isActive('heading', { level: 1 })}
          onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          aria-label="Heading 1"
          title="Heading 1 (H1)"
        >
          <Heading1 className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive('heading', { level: 2 })}
          onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          aria-label="Heading 2"
          title="Heading 2 (H2)"
        >
          <Heading2 className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive('heading', { level: 3 })}
          onPressedChange={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          aria-label="Heading 3"
          title="Heading 3 (H3)"
        >
          <Heading3 className="h-4 w-4" />
        </Toggle>

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Text Formatting */}
        <Toggle
          size="sm"
          pressed={editor.isActive('bold')}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
          aria-label="Bold"
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive('italic')}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          aria-label="Italic"
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive('code')}
          onPressedChange={() => editor.chain().focus().toggleCode().run()}
          aria-label="Code"
          title="Inline Code"
        >
          <Code className="h-4 w-4" />
        </Toggle>

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Lists */}
        <Toggle
          size="sm"
          pressed={editor.isActive('bulletList')}
          onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
          aria-label="Bullet List"
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive('orderedList')}
          onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
          aria-label="Ordered List"
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
        </Toggle>

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Block Elements */}
        <Toggle
          size="sm"
          pressed={editor.isActive('blockquote')}
          onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
          aria-label="Blockquote"
          title="Quote"
        >
          <Quote className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={false}
          onPressedChange={() => editor.chain().focus().setHorizontalRule().run()}
          aria-label="Horizontal Rule"
          title="Horizontal Line"
        >
          <Minus className="h-4 w-4" />
        </Toggle>

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Image Upload */}
        <Toggle
          size="sm"
          pressed={false}
          onPressedChange={() => fileInputRef.current?.click()}
          disabled={uploading}
          aria-label="Insert Image"
          title="Insert Image (or drag & drop)"
        >
          <ImageIcon className="h-4 w-4" />
        </Toggle>

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Undo/Redo */}
        <Toggle
          size="sm"
          pressed={false}
          onPressedChange={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          aria-label="Undo"
          title="Undo"
        >
          <Undo className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={false}
          onPressedChange={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          aria-label="Redo"
          title="Redo"
        >
          <Redo className="h-4 w-4" />
        </Toggle>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} className="min-h-[200px]" />

      {/* Heading Indicator */}
      <div className="px-3 py-1.5 border-t border-border bg-muted/30 text-xs text-muted-foreground flex items-center justify-between">
        <span>
          {editor.isActive('heading', { level: 1 }) && 'H1 - Main Heading'}
          {editor.isActive('heading', { level: 2 }) && 'H2 - Section Heading'}
          {editor.isActive('heading', { level: 3 }) && 'H3 - Subsection'}
          {editor.isActive('paragraph') && 'Paragraph'}
          {editor.isActive('bulletList') && 'Bullet List'}
          {editor.isActive('orderedList') && 'Numbered List'}
          {editor.isActive('blockquote') && 'Quote'}
        </span>
        <span className="text-muted-foreground/60">
          Drag & drop or paste images
        </span>
      </div>
    </div>
  );
};

export default RichTextEditor;
