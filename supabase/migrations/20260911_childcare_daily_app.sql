-- MyCoco daily childcare application foundation
-- Adult-facing parent / educator / provider-admin product.
-- Children are data subjects only: no child accounts are created by this schema.

create extension if not exists pgcrypto;

DO $$ BEGIN
  create type public.mycoco_member_role as enum ('parent','educator','provider_admin');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  create type public.mycoco_enrollment_status as enum ('invited','active','paused','ended');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  create type public.mycoco_daily_event_type as enum (
    'arrival','meal','snack','nap','activity','mood','note','photo','incident','departure'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

create table if not exists public.app_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.mycoco_member_role not null,
  first_name text not null,
  last_name text,
  phone text,
  locale text not null default 'fr' check (locale in ('fr','en')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.families (
  id uuid primary key default gen_random_uuid(),
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.family_members (
  family_id uuid not null references public.families(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  relationship_label text,
  is_primary boolean not null default false,
  created_at timestamptz not null default now(),
  primary key (family_id, user_id)
);
create index if not exists family_members_user_idx on public.family_members(user_id);

create table if not exists public.children (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references public.families(id) on delete cascade,
  first_name text not null,
  last_name text,
  birth_date date,
  avatar_path text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists children_family_idx on public.children(family_id);

create table if not exists public.provider_members (
  provider_id uuid not null references public.providers(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.mycoco_member_role not null check (role in ('educator','provider_admin')),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  primary key (provider_id, user_id)
);
create index if not exists provider_members_user_idx on public.provider_members(user_id);

create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references public.children(id) on delete cascade,
  provider_id uuid not null references public.providers(id) on delete cascade,
  status public.mycoco_enrollment_status not null default 'invited',
  start_date date,
  end_date date,
  group_name text,
  invite_code text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (child_id, provider_id)
);
create index if not exists enrollments_provider_idx on public.enrollments(provider_id, status);
create index if not exists enrollments_child_idx on public.enrollments(child_id, status);

create table if not exists public.child_health_flags (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references public.children(id) on delete cascade,
  flag_type text not null check (flag_type in ('allergy','intolerance','medical_note')),
  label text not null,
  severity text check (severity in ('low','moderate','high','critical')),
  instructions text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists child_health_flags_child_idx on public.child_health_flags(child_id, active);

create table if not exists public.emergency_contacts (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references public.children(id) on delete cascade,
  name text not null,
  relationship_label text,
  phone text not null,
  priority smallint not null default 1 check (priority between 1 and 10),
  authorized_pickup boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists emergency_contacts_child_idx on public.emergency_contacts(child_id, priority);

create table if not exists public.child_consents (
  child_id uuid not null references public.children(id) on delete cascade,
  consent_key text not null check (consent_key in ('private_photo','activity_photo','emergency_care','authorized_pickup')),
  granted boolean not null default false,
  granted_by uuid references auth.users(id) on delete set null,
  granted_at timestamptz,
  revoked_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (child_id, consent_key)
);

create table if not exists public.daily_reports (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references public.children(id) on delete cascade,
  provider_id uuid not null references public.providers(id) on delete cascade,
  report_date date not null default current_date,
  summary text,
  created_by uuid not null references auth.users(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (child_id, provider_id, report_date)
);
create index if not exists daily_reports_child_date_idx on public.daily_reports(child_id, report_date desc);
create index if not exists daily_reports_provider_date_idx on public.daily_reports(provider_id, report_date desc);

create table if not exists public.daily_events (
  id uuid primary key default gen_random_uuid(),
  report_id uuid not null references public.daily_reports(id) on delete cascade,
  event_type public.mycoco_daily_event_type not null,
  happened_at timestamptz not null default now(),
  title text,
  note text,
  metadata jsonb not null default '{}'::jsonb,
  media_path text,
  created_by uuid not null references auth.users(id) on delete restrict,
  created_at timestamptz not null default now()
);
create index if not exists daily_events_report_time_idx on public.daily_events(report_id, happened_at);

create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  provider_id uuid references public.providers(id) on delete cascade,
  family_id uuid references public.families(id) on delete cascade,
  child_id uuid references public.children(id) on delete cascade,
  subject text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint conversation_scope check (provider_id is not null and family_id is not null)
);
create index if not exists conversations_family_idx on public.conversations(family_id, updated_at desc);
create index if not exists conversations_provider_idx on public.conversations(provider_id, updated_at desc);

create table if not exists public.conversation_members (
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  last_read_at timestamptz,
  created_at timestamptz not null default now(),
  primary key (conversation_id, user_id)
);
create index if not exists conversation_members_user_idx on public.conversation_members(user_id);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid not null references auth.users(id) on delete restrict,
  body text not null check (char_length(body) between 1 and 5000),
  attachment_path text,
  created_at timestamptz not null default now(),
  edited_at timestamptz
);
create index if not exists messages_conversation_time_idx on public.messages(conversation_id, created_at);

create table if not exists public.calendar_events (
  id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references public.providers(id) on delete cascade,
  title text not null,
  description text,
  starts_at timestamptz not null,
  ends_at timestamptz,
  audience text not null default 'all' check (audience in ('all','group','child')),
  child_id uuid references public.children(id) on delete cascade,
  group_name text,
  created_by uuid not null references auth.users(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists calendar_events_provider_time_idx on public.calendar_events(provider_id, starts_at);

create table if not exists public.push_devices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  expo_push_token text not null unique,
  platform text not null check (platform in ('ios','android')),
  enabled boolean not null default true,
  updated_at timestamptz not null default now()
);
create index if not exists push_devices_user_idx on public.push_devices(user_id, enabled);

create or replace function public.is_family_member(target_family uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists(select 1 from public.family_members fm where fm.family_id = target_family and fm.user_id = auth.uid());
$$;

create or replace function public.is_provider_member(target_provider uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists(select 1 from public.provider_members pm where pm.provider_id = target_provider and pm.user_id = auth.uid() and pm.active = true);
$$;

create or replace function public.can_access_child(target_child uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists(
    select 1 from public.children c where c.id = target_child and public.is_family_member(c.family_id)
  ) or exists(
    select 1 from public.enrollments e
    where e.child_id = target_child and e.status = 'active' and public.is_provider_member(e.provider_id)
  );
$$;

alter table public.app_profiles enable row level security;
alter table public.families enable row level security;
alter table public.family_members enable row level security;
alter table public.children enable row level security;
alter table public.provider_members enable row level security;
alter table public.enrollments enable row level security;
alter table public.child_health_flags enable row level security;
alter table public.emergency_contacts enable row level security;
alter table public.child_consents enable row level security;
alter table public.daily_reports enable row level security;
alter table public.daily_events enable row level security;
alter table public.conversations enable row level security;
alter table public.conversation_members enable row level security;
alter table public.messages enable row level security;
alter table public.calendar_events enable row level security;
alter table public.push_devices enable row level security;

drop policy if exists app_profiles_self_select on public.app_profiles;
create policy app_profiles_self_select on public.app_profiles for select to authenticated using (id = auth.uid());
drop policy if exists app_profiles_self_update on public.app_profiles;
create policy app_profiles_self_update on public.app_profiles for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

drop policy if exists families_member_select on public.families;
create policy families_member_select on public.families for select to authenticated using (public.is_family_member(id));
drop policy if exists family_members_member_select on public.family_members;
create policy family_members_member_select on public.family_members for select to authenticated using (public.is_family_member(family_id));
drop policy if exists children_authorized_select on public.children;
create policy children_authorized_select on public.children for select to authenticated using (public.can_access_child(id));
drop policy if exists children_family_update on public.children;
create policy children_family_update on public.children for update to authenticated using (public.is_family_member(family_id)) with check (public.is_family_member(family_id));

drop policy if exists provider_members_same_provider_select on public.provider_members;
create policy provider_members_same_provider_select on public.provider_members for select to authenticated using (public.is_provider_member(provider_id));
drop policy if exists enrollments_authorized_select on public.enrollments;
create policy enrollments_authorized_select on public.enrollments for select to authenticated using (public.can_access_child(child_id));

drop policy if exists health_flags_authorized_select on public.child_health_flags;
create policy health_flags_authorized_select on public.child_health_flags for select to authenticated using (public.can_access_child(child_id));
drop policy if exists emergency_contacts_authorized_select on public.emergency_contacts;
create policy emergency_contacts_authorized_select on public.emergency_contacts for select to authenticated using (public.can_access_child(child_id));
drop policy if exists consents_authorized_select on public.child_consents;
create policy consents_authorized_select on public.child_consents for select to authenticated using (public.can_access_child(child_id));
drop policy if exists consents_family_manage on public.child_consents;
create policy consents_family_manage on public.child_consents for all to authenticated using (
  exists(select 1 from public.children c where c.id = child_id and public.is_family_member(c.family_id))
) with check (
  exists(select 1 from public.children c where c.id = child_id and public.is_family_member(c.family_id))
);

drop policy if exists reports_authorized_select on public.daily_reports;
create policy reports_authorized_select on public.daily_reports for select to authenticated using (public.can_access_child(child_id));
drop policy if exists reports_provider_insert on public.daily_reports;
create policy reports_provider_insert on public.daily_reports for insert to authenticated with check (
  public.is_provider_member(provider_id) and exists(select 1 from public.enrollments e where e.child_id = child_id and e.provider_id = provider_id and e.status = 'active') and created_by = auth.uid()
);
drop policy if exists reports_provider_update on public.daily_reports;
create policy reports_provider_update on public.daily_reports for update to authenticated using (public.is_provider_member(provider_id)) with check (public.is_provider_member(provider_id));

drop policy if exists events_authorized_select on public.daily_events;
create policy events_authorized_select on public.daily_events for select to authenticated using (
  exists(select 1 from public.daily_reports r where r.id = report_id and public.can_access_child(r.child_id))
);
drop policy if exists events_provider_insert on public.daily_events;
create policy events_provider_insert on public.daily_events for insert to authenticated with check (
  created_by = auth.uid() and exists(select 1 from public.daily_reports r where r.id = report_id and public.is_provider_member(r.provider_id))
);

drop policy if exists conversations_member_select on public.conversations;
create policy conversations_member_select on public.conversations for select to authenticated using (
  exists(select 1 from public.conversation_members cm where cm.conversation_id = id and cm.user_id = auth.uid())
);
drop policy if exists conversation_members_member_select on public.conversation_members;
create policy conversation_members_member_select on public.conversation_members for select to authenticated using (
  exists(select 1 from public.conversation_members mine where mine.conversation_id = conversation_id and mine.user_id = auth.uid())
);
drop policy if exists messages_member_select on public.messages;
create policy messages_member_select on public.messages for select to authenticated using (
  exists(select 1 from public.conversation_members cm where cm.conversation_id = conversation_id and cm.user_id = auth.uid())
);
drop policy if exists messages_member_insert on public.messages;
create policy messages_member_insert on public.messages for insert to authenticated with check (
  sender_id = auth.uid() and exists(select 1 from public.conversation_members cm where cm.conversation_id = conversation_id and cm.user_id = auth.uid())
);

drop policy if exists calendar_authorized_select on public.calendar_events;
create policy calendar_authorized_select on public.calendar_events for select to authenticated using (
  public.is_provider_member(provider_id) or exists(
    select 1 from public.enrollments e join public.children c on c.id = e.child_id
    where e.provider_id = calendar_events.provider_id and e.status = 'active' and public.is_family_member(c.family_id)
  )
);
drop policy if exists calendar_provider_manage on public.calendar_events;
create policy calendar_provider_manage on public.calendar_events for all to authenticated using (public.is_provider_member(provider_id)) with check (public.is_provider_member(provider_id) and created_by = auth.uid());

drop policy if exists push_devices_self on public.push_devices;
create policy push_devices_self on public.push_devices for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
