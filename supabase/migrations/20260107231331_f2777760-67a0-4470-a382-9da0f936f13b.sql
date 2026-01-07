-- Create guest_spots table
CREATE TABLE public.guest_spots (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  studio_name TEXT NOT NULL,
  city TEXT NOT NULL,
  country TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.guest_spots ENABLE ROW LEVEL SECURITY;

-- Public can view active guest spots
CREATE POLICY "Anyone can view active guest spots"
ON public.guest_spots
FOR SELECT
USING (is_active = true AND end_date >= CURRENT_DATE);

-- Admins can manage guest spots
CREATE POLICY "Admins can manage guest spots"
ON public.guest_spots
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add trigger for updated_at
CREATE TRIGGER update_guest_spots_updated_at
BEFORE UPDATE ON public.guest_spots
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();