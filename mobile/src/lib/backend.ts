import { supabase } from './supabase';

export async function signIn(email: string, password: string) {
  if (!supabase) return { demo: true };
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function fetchMyRole() {
  if (!supabase) return null;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data, error } = await supabase.from('app_profiles').select('role').eq('id', user.id).single();
  if (error) throw error;
  return data?.role ?? null;
}
