-- Add SKU column to products
ALTER TABLE public.products
ADD COLUMN sku text unique;

-- Add RLS policy so public can search by SKU
CREATE POLICY "Public can find active product by SKU"
  ON public.products FOR SELECT TO anon
  USING (status = 'active');
