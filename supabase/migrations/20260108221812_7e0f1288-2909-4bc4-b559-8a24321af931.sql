-- Fix RLS on portfolio_images: existing policies are RESTRICTIVE ("Permissive: No"), which blocks public reads.
-- Replace them with PERMISSIVE policies.

ALTER TABLE public.portfolio_images ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can manage portfolio images" ON public.portfolio_images;
DROP POLICY IF EXISTS "Anyone can view visible portfolio images" ON public.portfolio_images;

CREATE POLICY "Public can view visible portfolio images"
ON public.portfolio_images
AS PERMISSIVE
FOR SELECT
TO public
USING (is_visible = true);

CREATE POLICY "Admins can manage portfolio images"
ON public.portfolio_images
AS PERMISSIVE
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));
