-- Create storage bucket for booking reference images
INSERT INTO storage.buckets (id, name, public)
VALUES ('booking-references', 'booking-references', true);

-- Allow anyone to upload files to the bucket
CREATE POLICY "Anyone can upload booking references"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'booking-references');

-- Allow anyone to view booking reference files
CREATE POLICY "Anyone can view booking references"
ON storage.objects
FOR SELECT
USING (bucket_id = 'booking-references');

-- Allow anyone to delete their uploaded files (within session)
CREATE POLICY "Anyone can delete booking references"
ON storage.objects
FOR DELETE
USING (bucket_id = 'booking-references');