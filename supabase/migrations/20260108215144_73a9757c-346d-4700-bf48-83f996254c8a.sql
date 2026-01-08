-- Create portfolio storage bucket for tattoo work images
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio', 'portfolio', true);

-- Allow public read access to portfolio images
CREATE POLICY "Portfolio images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'portfolio');

-- Allow authenticated admins to upload portfolio images
CREATE POLICY "Admins can upload portfolio images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'portfolio' 
  AND auth.uid() IS NOT NULL 
  AND public.has_role(auth.uid(), 'admin')
);

-- Allow authenticated admins to update portfolio images
CREATE POLICY "Admins can update portfolio images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'portfolio' 
  AND auth.uid() IS NOT NULL 
  AND public.has_role(auth.uid(), 'admin')
);

-- Allow authenticated admins to delete portfolio images
CREATE POLICY "Admins can delete portfolio images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'portfolio' 
  AND auth.uid() IS NOT NULL 
  AND public.has_role(auth.uid(), 'admin')
);