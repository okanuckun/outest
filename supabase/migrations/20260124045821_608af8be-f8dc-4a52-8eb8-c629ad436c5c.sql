-- Make the booking-references bucket public so images can be accessed
UPDATE storage.buckets 
SET public = true 
WHERE id = 'booking-references';