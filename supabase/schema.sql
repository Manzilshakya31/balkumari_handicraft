-- =============================================================
-- Balkumari Handicraft — Supabase Schema
-- Run this once in the Supabase SQL Editor to set up tables.
-- =============================================================


-- -------------------------------------------------------------
-- TABLE: products
-- -------------------------------------------------------------
create table public.products (
  id          uuid                     primary key default gen_random_uuid(),
  name        text                     not null,
  description text,
  price       numeric(10, 2),
  category    text,
  material    text,
  dimensions  text,
  origin      text                     not null default 'Nepal',
  stock       integer                  not null default 0,
  status      text                     not null default 'active',
  created_at  timestamp with time zone not null default now(),
  updated_at  timestamp with time zone not null default now(),

  constraint products_status_check check (status in ('active', 'inactive'))
);


-- -------------------------------------------------------------
-- TABLE: product_images
-- -------------------------------------------------------------
create table public.product_images (
  id         uuid                     primary key default gen_random_uuid(),
  product_id uuid                     not null references public.products (id) on delete cascade,
  url        text                     not null,
  alt_text   text,
  sort_order integer                  not null default 0,
  created_at timestamp with time zone not null default now()
);


-- -------------------------------------------------------------
-- TABLE: blogs
-- -------------------------------------------------------------
create table public.blogs (
  id           uuid                     primary key default gen_random_uuid(),
  title        text                     not null,
  slug         text                     not null unique,
  content      text,
  excerpt      text,
  cover_image  text,
  status       text                     not null default 'draft',
  created_at   timestamp with time zone not null default now(),
  updated_at   timestamp with time zone not null default now(),

  constraint blogs_status_check check (status in ('draft', 'published'))
);


-- -------------------------------------------------------------
-- TRIGGER: keep updated_at current on products and blogs
-- -------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger products_set_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

create trigger blogs_set_updated_at
  before update on public.blogs
  for each row execute function public.set_updated_at();


-- -------------------------------------------------------------
-- ROW LEVEL SECURITY
-- -------------------------------------------------------------
alter table public.products       enable row level security;
alter table public.product_images enable row level security;
alter table public.blogs          enable row level security;


-- --- products policies ---

-- Public can read active products
create policy "Public can view active products"
  on public.products
  for select
  to anon
  using (status = 'active');

-- Authenticated users have full access
create policy "Authenticated users have full access to products"
  on public.products
  for all
  to authenticated
  using (true)
  with check (true);


-- --- product_images policies ---

-- Public can read images that belong to an active product
create policy "Public can view images of active products"
  on public.product_images
  for select
  to anon
  using (
    exists (
      select 1
      from public.products p
      where p.id = product_id
        and p.status = 'active'
    )
  );

-- Authenticated users have full access
create policy "Authenticated users have full access to product images"
  on public.product_images
  for all
  to authenticated
  using (true)
  with check (true);


-- --- blogs policies ---

-- Public can read published blogs
create policy "Public can view published blogs"
  on public.blogs
  for select
  to anon
  using (status = 'published');

-- Authenticated users have full access
create policy "Authenticated users have full access to blogs"
  on public.blogs
  for all
  to authenticated
  using (true)
  with check (true);
