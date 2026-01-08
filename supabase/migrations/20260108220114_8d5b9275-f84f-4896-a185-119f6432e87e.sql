-- Create portfolio_images table to store image order
CREATE TABLE public.portfolio_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  storage_path TEXT NOT NULL UNIQUE,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.portfolio_images ENABLE ROW LEVEL SECURITY;

-- Public can view visible images
CREATE POLICY "Anyone can view visible portfolio images"
ON public.portfolio_images
FOR SELECT
USING (is_visible = true);

-- Admins can manage all portfolio images
CREATE POLICY "Admins can manage portfolio images"
ON public.portfolio_images
FOR ALL
USING (has_role(auth.uid(), 'admin'));

-- Create trigger for updated_at
CREATE TRIGGER update_portfolio_images_updated_at
BEFORE UPDATE ON public.portfolio_images
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();