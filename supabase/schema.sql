-- Trouver une garde — production-ready data foundation for Supabase/PostgreSQL
-- This file defines the data model only. No credentials or private child data are stored here.

create extension if not exists pgcrypto;
create extension if not exists postgis with schema extensions;

create type public.provider_type as enum (
  'cpe',
  'subsidized_daycare',
  'home_daycare',
  'private_daycare'
);

create type public.availability_status as enum (
  'available',
  'waitlist',
  'unknown',
  'unavailable'
);

create table public.providers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  provider_type public.provider_type not null,
  description_fr text,
  description_en text,
  phone text,
  email text,
  website_url text,
  address_line text,
  city text not null,
  province text not null default 'QC',
  postal_code text,
  location extensions.geography(Point, 4326),
  hours jsonb not null default '{}'::jsonb,
  ages_min_months smallint,
  ages_max_months smallint,
  is_subsidized boolean not null default false,
  source_name text,
  source_url text,
  is_claimed boolean not null default false,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint providers_age_range check (
    ages_min_months is null or ages_max_months is null or ages_min_months <= ages_max_months
  )
);

create index providers_city_idx on public.providers (lower(city));
create index providers_type_idx on public.providers (provider_type);
create index providers_published_idx on public.providers (is_published);
create index providers_location_gist_idx on public.providers using gist (location);

create table public.availability_snapshots (
  id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references public.providers(id) on delete cascade,
  status public.availability_status not null default 'unknown',
  available_from date,
  age_min_months smallint,
  age_max_months smallint,
  places_count smallint,
  note_fr text,
  note_en text,
  source_name text,
  source_url text,
  checked_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  constraint availability_age_range check (
    age_min_months is null or age_max_months is null or age_min_months <= age_max_months
  ),
  constraint availability_places_nonnegative check (places_count is null or places_count >= 0)
);

create index availability_provider_idx on public.availability_snapshots (provider_id, checked_at desc);
create index availability_status_idx on public.availability_snapshots (status, checked_at desc);

create table public.provider_claims (
  id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references public.providers(id) on delete cascade,
  requester_name text not null,
  requester_email text not null,
  message text,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);

create index provider_claims_provider_idx on public.provider_claims (provider_id, created_at desc);

create table public.search_alerts (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  locale text not null default 'fr' check (locale in ('fr','en')),
  city text,
  postal_code text,
  radius_km smallint default 10 check (radius_km between 1 and 50),
  age_min_months smallint,
  age_max_months smallint,
  provider_types public.provider_type[],
  consent_at timestamptz not null default now(),
  unsubscribe_token uuid not null default gen_random_uuid(),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index search_alerts_unsubscribe_token_idx on public.search_alerts (unsubscribe_token);
create index search_alerts_email_idx on public.search_alerts (lower(email));

-- Public read model: no claimant data, private emails or internal moderation fields.
create view public.public_childcare_listings as
select
  p.id,
  p.name,
  p.provider_type,
  p.description_fr,
  p.description_en,
  p.phone,
  p.website_url,
  p.address_line,
  p.city,
  p.province,
  p.postal_code,
  p.location,
  p.hours,
  p.ages_min_months,
  p.ages_max_months,
  p.is_subsidized,
  p.source_name,
  p.source_url,
  a.status as availability_status,
  a.available_from,
  a.places_count,
  a.note_fr as availability_note_fr,
  a.note_en as availability_note_en,
  a.checked_at as availability_checked_at,
  p.updated_at
from public.providers p
left join lateral (
  select a.*
  from public.availability_snapshots a
  where a.provider_id = p.id
  order by a.checked_at desc
  limit 1
) a on true
where p.is_published = true;

-- RLS is enabled from the start. Public browsing should use the read view,
-- while writes and private data are handled by authenticated/server-side flows.
alter table public.providers enable row level security;
alter table public.availability_snapshots enable row level security;
alter table public.provider_claims enable row level security;
alter table public.search_alerts enable row level security;

-- No broad anonymous table policies are created intentionally.
-- Add narrowly scoped policies after the authentication/claim workflow is implemented.

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger providers_set_updated_at
before update on public.providers
for each row execute function public.set_updated_at();

create trigger search_alerts_set_updated_at
before update on public.search_alerts
for each row execute function public.set_updated_at();
