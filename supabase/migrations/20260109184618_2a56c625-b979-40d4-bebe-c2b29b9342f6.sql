-- Add cover_image column to projects table for hero/cover image
ALTER TABLE public.projects 
ADD COLUMN cover_image text;