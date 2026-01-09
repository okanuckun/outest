-- Add is_featured column to portfolio_images
ALTER TABLE public.portfolio_images 
ADD COLUMN is_featured boolean DEFAULT false;

-- Create index for faster featured queries
CREATE INDEX idx_portfolio_images_featured ON public.portfolio_images (is_featured) WHERE is_featured = true;