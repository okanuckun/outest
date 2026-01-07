-- Add description column to projects table for rich content
ALTER TABLE public.projects
ADD COLUMN description text;