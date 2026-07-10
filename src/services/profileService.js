import { supabase } from "../lib/supabase";

export async function getProfile(userId) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw error;

  return data;
}

export async function updateProfile(userId, values) {
  const { error } = await supabase
    .from("profiles")
    .upsert({
      id: userId,
      ...values,
      updated_at: new Date().toISOString(),
    });

  if (error) throw error;
}