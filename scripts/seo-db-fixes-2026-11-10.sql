-- SEO database fixes for okanuckun.com (prepared 2026-11-10, NOT yet applied).
-- Replaces stale "black & grey realism / portraits" copy and the placeholder
-- "ofrfrfr" social handles in the seo_pages table. Run only after Okan approves
-- (Lovable SQL editor, or edit the same fields in /admin/seo → Pages).

UPDATE seo_pages SET
  og_title = 'Okan Uckun | Geometric & Minimalist Tattoo Artist NYC',
  og_description = 'Geometric, minimalist and fine line tattoos by Okan Uckun. Custom designs by appointment at his Brooklyn studio, serving all of NYC.',
  schema_data = '{"@context":"https://schema.org","@type":"LocalBusiness","name":"Okan Uckun Tattoo","url":"https://okanuckun.com","image":"https://okanuckun.com/og-images/okan-default.jpg","priceRange":"$$$","address":{"@type":"PostalAddress","streetAddress":"77 Washington Avenue","addressLocality":"Brooklyn","addressRegion":"NY","addressCountry":"US"},"description":"Tattoo artist specializing in geometric, minimalist and fine line tattoos. Brooklyn studio, serving all of NYC.","sameAs":["https://www.instagram.com/okanuckun","https://www.tiktok.com/@okanuckun"]}'::jsonb
WHERE route = '/';

UPDATE seo_pages SET
  og_title = 'About Okan Uckun | Geometric & Minimalist Tattoo Artist',
  og_description = 'Okan Uckun is a Brooklyn-based tattoo artist known for geometric, minimalist and fine line work shaped by contemporary art and architecture.',
  schema_data = '{"@context":"https://schema.org","@type":"Person","name":"Okan Uckun","url":"https://okanuckun.com/about","jobTitle":"Tattoo Artist","description":"Brooklyn-based tattoo artist specializing in geometric, minimalist and fine line tattoos.","sameAs":["https://www.instagram.com/okanuckun","https://www.tiktok.com/@okanuckun"]}'::jsonb
WHERE route = '/about';

UPDATE seo_pages SET
  meta_description = 'Tattoo portfolio of Okan Uckun: geometric, minimalist, fine line and linework tattoos from his Brooklyn studio and guest spots worldwide.',
  og_description = 'Geometric, minimalist, fine line and linework tattoos by Okan Uckun, Brooklyn NYC.'
WHERE route = '/work';
