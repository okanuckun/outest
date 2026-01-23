-- Fix email_templates: Remove public SELECT policy (templates now fetched via service role)
DROP POLICY IF EXISTS "Email templates are readable by everyone" ON public.email_templates;

-- Fix bookings: Add explicit INSERT policy for public submissions via edge function
-- Note: The edge function uses service role key which bypasses RLS, but having an explicit
-- restrictive policy documents the intent and protects against accidental changes
CREATE POLICY "Public cannot insert bookings directly" 
ON public.bookings 
FOR INSERT 
TO anon
WITH CHECK (false);

-- Fix booking-references storage: Make bucket private and restrict policies
-- First, update the bucket to be private
UPDATE storage.buckets 
SET public = false 
WHERE id = 'booking-references';

-- Drop existing overly permissive policies on booking-references
DROP POLICY IF EXISTS "Anyone can upload booking references" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view booking references" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete booking references" ON storage.objects;
DROP POLICY IF EXISTS "Public can upload booking references" ON storage.objects;
DROP POLICY IF EXISTS "Public can view booking references" ON storage.objects;

-- Create restricted policies for booking-references bucket
-- Allow public uploads (needed for booking form submissions)
CREATE POLICY "Allow public uploads to booking-references" 
ON storage.objects 
FOR INSERT 
TO anon, authenticated
WITH CHECK (bucket_id = 'booking-references');

-- Only allow admins to view booking reference files
CREATE POLICY "Admins can view booking references" 
ON storage.objects 
FOR SELECT 
TO authenticated
USING (bucket_id = 'booking-references' AND public.has_role(auth.uid(), 'admin'));

-- Only allow admins to delete booking reference files
CREATE POLICY "Admins can delete booking references" 
ON storage.objects 
FOR DELETE 
TO authenticated
USING (bucket_id = 'booking-references' AND public.has_role(auth.uid(), 'admin'));