import { supabase } from "../lib/supabase";

export async function getMyEntries(userId) {
  const { data, error } = await supabase
    .from("entries")
    .select(`
      id,
      ticket_number,
      created_at,
      giveaways (
        id,
        title,
        status,
        image_url
      )
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data || [];
}