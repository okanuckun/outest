-- Add slug column to projects table
ALTER TABLE public.projects 
ADD COLUMN slug text UNIQUE;

-- Create a function to generate slug from title
CREATE OR REPLACE FUNCTION public.generate_project_slug(title text)
RETURNS text
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  base_slug text;
  final_slug text;
  counter integer := 0;
BEGIN
  -- Convert title to slug format
  base_slug := lower(regexp_replace(title, '[^a-zA-Z0-9]+', '-', 'g'));
  base_slug := trim(both '-' from base_slug);
  
  final_slug := base_slug;
  
  -- Check for duplicates and add number if needed
  WHILE EXISTS (SELECT 1 FROM public.projects WHERE slug = final_slug) LOOP
    counter := counter + 1;
    final_slug := base_slug || '-' || counter;
  END LOOP;
  
  RETURN final_slug;
END;
$$;

-- Update existing projects with auto-generated slugs
UPDATE public.projects 
SET slug = generate_project_slug(title)
WHERE slug IS NULL;