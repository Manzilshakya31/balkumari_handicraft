-- Auto-generate SKU using a sequence
CREATE SEQUENCE IF NOT EXISTS products_sku_seq START 1;

CREATE OR REPLACE FUNCTION generate_product_sku()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.sku IS NULL OR NEW.sku = '' THEN
    NEW.sku := 'BKH-' || LPAD(nextval('products_sku_seq')::text, 4, '0');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_product_sku
  BEFORE INSERT ON public.products
  FOR EACH ROW EXECUTE FUNCTION generate_product_sku();

-- Add bargain price column (admin only, never shown publicly)
ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS bargain_price numeric(10,2);

-- Add availability column (separate from active/inactive status)
ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS is_available boolean NOT NULL DEFAULT true;
