-- MyCoco security hardening for the daily childcare schema.
-- Apply immediately after 20260911_childcare_daily_app.sql and before exposing the app to users.

create schema if not exists private;
revoke all on schema private from public;
grant usage on schema private to authenticated;

create or replace function private.is_family_member(target_family uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists(
    select 1 from public.family_members fm
    where fm.family_id = target_family and fm.user_id = (select auth.uid())
  );
$$;

create or replace function private.is_provider_member(target_provider uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists(
    select 1 from public.provider_members pm
    where pm.provider_id = target_provider
      and pm.user_id = (select auth.uid())
      and pm.active = true
  );
$$;

create or replace function private.can_access_child(target_child uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists(
    select 1 from public.children c
    join public.family_members fm on fm.family_id = c.family_id
    where c.id = target_child and fm.user_id = (select auth.uid())
  ) or exists(
    select 1 from public.enrollments e
    join public.provider_members pm on pm.provider_id = e.provider_id
    where e.child_id = target_child
      and e.status = 'active'::public.mycoco_enrollment_status
      and pm.user_id = (select auth.uid())
      and pm.active = true
  );
$$;

create or replace function private.is_conversation_member(target_conversation uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists(
    select 1 from public.conversation_members cm
    where cm.conversation_id = target_conversation
      and cm.user_id = (select auth.uid())
  );
$$;

revoke execute on function private.is_family_member(uuid) from public, anon;
revoke execute on function private.is_provider_member(uuid) from public, anon;
revoke execute on function private.can_access_child(uuid) from public, anon;
revoke execute on function private.is_conversation_member(uuid) from public, anon;
grant execute on function private.is_family_member(uuid) to authenticated;
grant execute on function private.is_provider_member(uuid) to authenticated;
grant execute on function private.can_access_child(uuid) to authenticated;
grant execute on function private.is_conversation_member(uuid) to authenticated;

-- Grants and RLS are separate controls. Keep anonymous clients completely out.
revoke all on table public.app_profiles, public.families, public.family_members, public.children,
  public.provider_members, public.enrollments, public.child_health_flags, public.emergency_contacts,
  public.child_consents, public.daily_reports, public.daily_events, public.conversations,
  public.conversation_members, public.messages, public.calendar_events, public.push_devices
from anon, authenticated;

grant select, update on table public.app_profiles to authenticated;
grant select on table public.families, public.family_members, public.provider_members, public.enrollments,
  public.child_health_flags, public.emergency_contacts, public.conversations, public.conversation_members to authenticated;
grant select, update on table public.children to authenticated;
grant select, insert, update, delete on table public.child_consents to authenticated;
grant select, insert, update on table public.daily_reports to authenticated;
grant select, insert on table public.daily_events, public.messages to authenticated;
grant select, insert, update, delete on table public.calendar_events, public.push_devices to authenticated;

-- Replace membership policies with private, caller-filtered helpers.
drop policy if exists families_member_select on public.families;
create policy families_member_select on public.families for select to authenticated
using ((select private.is_family_member(id)));

drop policy if exists family_members_member_select on public.family_members;
create policy family_members_member_select on public.family_members for select to authenticated
using ((select private.is_family_member(family_id)));

drop policy if exists children_authorized_select on public.children;
create policy children_authorized_select on public.children for select to authenticated
using ((select private.can_access_child(id)));

drop policy if exists children_family_update on public.children;
create policy children_family_update on public.children for update to authenticated
using ((select private.is_family_member(family_id)))
with check ((select private.is_family_member(family_id)));

drop policy if exists provider_members_same_provider_select on public.provider_members;
create policy provider_members_same_provider_select on public.provider_members for select to authenticated
using ((select private.is_provider_member(provider_id)));

drop policy if exists enrollments_authorized_select on public.enrollments;
create policy enrollments_authorized_select on public.enrollments for select to authenticated
using ((select private.can_access_child(child_id)));

drop policy if exists health_flags_authorized_select on public.child_health_flags;
create policy health_flags_authorized_select on public.child_health_flags for select to authenticated
using ((select private.can_access_child(child_id)));

drop policy if exists emergency_contacts_authorized_select on public.emergency_contacts;
create policy emergency_contacts_authorized_select on public.emergency_contacts for select to authenticated
using ((select private.can_access_child(child_id)));

drop policy if exists consents_authorized_select on public.child_consents;
create policy consents_authorized_select on public.child_consents for select to authenticated
using ((select private.can_access_child(child_id)));

drop policy if exists consents_family_manage on public.child_consents;
drop policy if exists consents_family_insert on public.child_consents;
create policy consents_family_insert on public.child_consents for insert to authenticated
with check (exists(select 1 from public.children c where c.id = child_id and (select private.is_family_member(c.family_id))));
drop policy if exists consents_family_update on public.child_consents;
create policy consents_family_update on public.child_consents for update to authenticated
using (exists(select 1 from public.children c where c.id = child_id and (select private.is_family_member(c.family_id))))
with check (exists(select 1 from public.children c where c.id = child_id and (select private.is_family_member(c.family_id))));
drop policy if exists consents_family_delete on public.child_consents;
create policy consents_family_delete on public.child_consents for delete to authenticated
using (exists(select 1 from public.children c where c.id = child_id and (select private.is_family_member(c.family_id))));

drop policy if exists reports_authorized_select on public.daily_reports;
create policy reports_authorized_select on public.daily_reports for select to authenticated
using ((select private.can_access_child(child_id)));
drop policy if exists reports_provider_insert on public.daily_reports;
create policy reports_provider_insert on public.daily_reports for insert to authenticated
with check ((select private.is_provider_member(provider_id)) and created_by = (select auth.uid())
  and exists(select 1 from public.enrollments e where e.child_id = child_id and e.provider_id = provider_id and e.status = 'active'));
drop policy if exists reports_provider_update on public.daily_reports;
create policy reports_provider_update on public.daily_reports for update to authenticated
using ((select private.is_provider_member(provider_id)))
with check ((select private.is_provider_member(provider_id)));

drop policy if exists events_authorized_select on public.daily_events;
create policy events_authorized_select on public.daily_events for select to authenticated
using (exists(select 1 from public.daily_reports r where r.id = report_id and (select private.can_access_child(r.child_id))));
drop policy if exists events_provider_insert on public.daily_events;
create policy events_provider_insert on public.daily_events for insert to authenticated
with check (created_by = (select auth.uid())
  and exists(select 1 from public.daily_reports r where r.id = report_id and (select private.is_provider_member(r.provider_id))));

-- Conversation-member lookup would recurse if it queried its own RLS policy directly.
drop policy if exists conversations_member_select on public.conversations;
create policy conversations_member_select on public.conversations for select to authenticated
using ((select private.is_conversation_member(id)));
drop policy if exists conversation_members_member_select on public.conversation_members;
create policy conversation_members_member_select on public.conversation_members for select to authenticated
using ((select private.is_conversation_member(conversation_id)));
drop policy if exists messages_member_select on public.messages;
create policy messages_member_select on public.messages for select to authenticated
using ((select private.is_conversation_member(conversation_id)));
drop policy if exists messages_member_insert on public.messages;
create policy messages_member_insert on public.messages for insert to authenticated
with check (sender_id = (select auth.uid()) and (select private.is_conversation_member(conversation_id)));

drop policy if exists calendar_authorized_select on public.calendar_events;
create policy calendar_authorized_select on public.calendar_events for select to authenticated
using ((select private.is_provider_member(provider_id)) or exists(
  select 1 from public.enrollments e join public.children c on c.id = e.child_id
  where e.provider_id = calendar_events.provider_id and e.status = 'active'
    and (select private.is_family_member(c.family_id))
));
drop policy if exists calendar_provider_manage on public.calendar_events;
drop policy if exists calendar_provider_insert on public.calendar_events;
create policy calendar_provider_insert on public.calendar_events for insert to authenticated
with check ((select private.is_provider_member(provider_id)) and created_by = (select auth.uid()));
drop policy if exists calendar_provider_update on public.calendar_events;
create policy calendar_provider_update on public.calendar_events for update to authenticated
using ((select private.is_provider_member(provider_id)))
with check ((select private.is_provider_member(provider_id)) and created_by = (select auth.uid()));
drop policy if exists calendar_provider_delete on public.calendar_events;
create policy calendar_provider_delete on public.calendar_events for delete to authenticated
using ((select private.is_provider_member(provider_id)));

drop policy if exists push_devices_self on public.push_devices;
drop policy if exists push_devices_self_select on public.push_devices;
create policy push_devices_self_select on public.push_devices for select to authenticated using (user_id = (select auth.uid()));
drop policy if exists push_devices_self_insert on public.push_devices;
create policy push_devices_self_insert on public.push_devices for insert to authenticated with check (user_id = (select auth.uid()));
drop policy if exists push_devices_self_update on public.push_devices;
create policy push_devices_self_update on public.push_devices for update to authenticated
using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
drop policy if exists push_devices_self_delete on public.push_devices;
create policy push_devices_self_delete on public.push_devices for delete to authenticated using (user_id = (select auth.uid()));

-- Remove the original exposed helper functions only after all policies have been repointed.
drop function if exists public.can_access_child(uuid);
drop function if exists public.is_provider_member(uuid);
drop function if exists public.is_family_member(uuid);
