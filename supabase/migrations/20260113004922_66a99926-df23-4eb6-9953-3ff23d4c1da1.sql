-- Fix permissive INSERT policy - require service role key for inserts
DROP POLICY "Allow insert from edge functions" ON public.bookings;

-- Edge functions use service_role key which bypasses RLS anyway
-- So we don't need an INSERT policy at all for public access