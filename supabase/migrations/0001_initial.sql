-- Security-first schema. Run in Supabase SQL editor/migrations.
-- Privacy principle: never store a child's name, photo, health data or unnecessary identifying data.

create extension if not exists pgcrypto;

create table if not exists public.childcare_services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  service_type text not null check (service_type in ('cpe','subsidized','family','private')),
  address_city text not null,
  postal_prefix text,
  latitude double precision,
  longitude double precision,
  age_min_months smallint,
  age_max_months smallint,
  hours_text text,
  public_phone text,
  public_website text,
  source text,
  source_url text,
  availability_status text not null default 'unknown' check (availability_status in ('available','waitlist','unknown','closed')),
  availability_updated_at timestamptz,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.availability_updates (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references public.childcare_services(id) on delete cascade,
  status text not null check (status in ('available','waitlist','unknown','closed')),
  age_min_months smallint,
  age_max_months smallint,
  available_from date,
  note text,
  source text,
  created_at timestamptz not null default now()
);

create table if not exists public.alerts (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  city text,
  postal_prefix text,
  age_months smallint,
  service_types text[],
  consent_at timestamptz not null default now(),
  confirmed_at timestamptz,
  unsubscribed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.provider_claims (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references public.childcare_services(id) on delete cascade,
  email text not null,
  message text,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  created_at timestamptz not null default now()
);

create index if not exists childcare_services_city_idx on public.childcare_services(address_city);
create index if not exists childcare_services_type_idx on public.childcare_services(service_type);
create index if not exists childcare_services_availability_idx on public.childcare_services(availability_status, availability_updated_at desc);
create index if not exists availability_updates_service_idx on public.availability_updates(service_id, created_at desc);

alter table public.childcare_services enable row level security;
alter table public.availability_updates enable row level security;
alter table public.alerts enable row level security;
alter table public.provider_claims enable row level security;

-- Public can read only intentionally published service fields through a view.
create or replace view public.published_childcare_services
with (security_invoker = true) as
select id, name, slug, service_type, address_city, postal_prefix,
       latitude, longitude, age_min_months, age_max_months, hours_text,
       public_phone, public_website, source, source_url,
       availability_status, availability_updated_at, updated_at
from public.childcare_services
where is_published = true;

-- No public INSERT/UPDATE/DELETE policies are created intentionally.
-- Server-side/admin operations must use a privileged backend key and never expose it to the browser.

comment on table public.alerts is 'Contains contact data. Never expose directly to anonymous clients.';
comment on table public.provider_claims is 'Contains contact data. Never expose directly to anonymous clients.';
