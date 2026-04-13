CREATE TABLE public.nyc_appointments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  label TEXT NOT NULL DEFAULT 'NYC - Monolith Studio',
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.nyc_appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active NYC appointments"
ON public.nyc_appointments
FOR SELECT
USING (is_active = true AND end_date >= CURRENT_DATE);

CREATE POLICY "Admins can manage NYC appointments"
ON public.nyc_appointments
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_nyc_appointments_updated_at
BEFORE UPDATE ON public.nyc_appointments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();