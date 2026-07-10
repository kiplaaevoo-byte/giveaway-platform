import { supabase } from "../lib/supabase";

export async function getDashboardStats(userId) {
  try {
    // Entries
    const { count: entriesCount, error: entriesError } = await supabase
      .from("entries")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    if (entriesError) throw entriesError;

    // Active Giveaways
    const { count: giveawayCount, error: giveawayError } = await supabase
      .from("giveaways")
      .select("*", { count: "exact", head: true })
      .eq("status", "active");

    if (giveawayError) throw giveawayError;

    // Wins
    const { count: winsCount, error: winsError } = await supabase
      .from("winners")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    // If winners table doesn't exist yet
    if (winsError) {
      console.warn("Winners table not found.");
    }

    return {
      entries: entriesCount || 0,
      giveaways: giveawayCount || 0,
      wins: winsCount || 0,
      tickets: entriesCount || 0,
    };
  } catch (err) {
    console.error(err);

    return {
      entries: 0,
      giveaways: 0,
      wins: 0,
      tickets: 0,
    };
  }
}

export async function getRecentEntries(userId) {
  try {
    const { data, error } = await supabase
      .from("entries")
      .select(`
        id,
        ticket_number,
        created_at,
        giveaways (
          title
        )
      `)
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(5);

    if (error) throw error;

    return (
      data?.map((entry) => ({
        ...entry,
        status: "Active",
      })) || []
    );
  } catch (err) {
    console.error(err);
    return [];
  }
}