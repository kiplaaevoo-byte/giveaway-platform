import { supabase } from "../lib/supabase";

// ======================================
// GET ALL GIVEAWAYS
// ======================================

export async function getGiveaways() {
  const { data, error } = await supabase
    .from("giveaways")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data || [];
}

// ======================================
// GET SINGLE GIVEAWAY
// ======================================

export async function getGiveaway(id) {
  const { data, error } = await supabase
    .from("giveaways")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}

// ======================================
// SEARCH GIVEAWAYS
// ======================================

export async function searchGiveaways(keyword) {
  const { data, error } = await supabase
    .from("giveaways")
    .select("*")
    .ilike("title", `%${keyword}%`)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data || [];
}

// ======================================
// GET GIVEAWAYS BY CATEGORY
// ======================================

export async function getGiveawaysByCategory(category) {
  const { data, error } = await supabase
    .from("giveaways")
    .select("*")
    .eq("category", category)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data || [];
}

// ======================================
// GET ACTIVE GIVEAWAYS
// ======================================

export async function getActiveGiveaways() {
  const { data, error } = await supabase
    .from("giveaways")
    .select("*")
    .eq("status", "Active")
    .order("end_date", { ascending: true });

  if (error) throw error;

  return data || [];
}

// ======================================
// GET FEATURED GIVEAWAYS
// ======================================

export async function getFeaturedGiveaways(limit = 6) {
  const { data, error } = await supabase
    .from("giveaways")
    .select("*")
    .eq("status", "Active")
    .order("prize_value", { ascending: false })
    .limit(limit);

  if (error) throw error;

  return data || [];
}

// ======================================
// ENDING SOON
// ======================================

export async function getEndingSoon(limit = 6) {
  const { data, error } = await supabase
    .from("giveaways")
    .select("*")
    .eq("status", "Active")
    .order("end_date", { ascending: true })
    .limit(limit);

  if (error) throw error;

  return data || [];
}

// ======================================
// LATEST GIVEAWAYS
// ======================================

export async function getLatestGiveaways(limit = 8) {
  const { data, error } = await supabase
    .from("giveaways")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;

  return data || [];
}

// ======================================
// ENTER GIVEAWAY
// ======================================

export async function enterGiveaway(giveawayId, userId) {
  const { data: existing, error: checkError } = await supabase
    .from("entries")
    .select("id")
    .eq("giveaway_id", giveawayId)
    .eq("user_id", userId)
    .maybeSingle();

  if (checkError) throw checkError;

  if (existing) {
    throw new Error("You have already entered this giveaway.");
  }

  const ticketNumber = `GH-${Date.now()}-${Math.floor(
    Math.random() * 10000
  )}`;

  const { data, error } = await supabase
    .from("entries")
    .insert([
      {
        giveaway_id: giveawayId,
        user_id: userId,
        ticket_number: ticketNumber,
      },
    ])
    .select()
    .single();

  if (error) throw error;

  return data;
}

// ======================================
// PARTICIPANT COUNT
// ======================================

export async function getParticipantCount(giveawayId) {
  const { count, error } = await supabase
    .from("entries")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("giveaway_id", giveawayId);

  if (error) throw error;

  return count ?? 0;
}

// ======================================
// MY ENTRIES
// ======================================

export async function getMyEntries(userId) {
  const { data, error } = await supabase
    .from("entries")
    .select(`
      *,
      giveaways (
        id,
        title,
        category,
        prize_value,
        image_url,
        status,
        end_date
      )
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data || [];
}

// ======================================
// WINNERS
// ======================================

export async function getWinners() {
  const { data, error } = await supabase
    .from("winners")
    .select(`
      *,
      giveaways (
        id,
        title,
        prize_value
      ),
      profiles (
        full_name
      )
    `)
    .order("announced_at", { ascending: false });

  if (error) throw error;

  return data || [];
}

// ======================================
// DASHBOARD STATS
// ======================================

export async function getDashboardStats(userId) {
  const { count: entries } = await supabase
    .from("entries")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("user_id", userId);

  const { count: wins } = await supabase
    .from("winners")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("user_id", userId);

  const { count: giveaways } = await supabase
    .from("giveaways")
    .select("*", {
      count: "exact",
      head: true,
    });

  const { count: active } = await supabase
    .from("giveaways")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("status", "Active");

  return {
    entries: entries ?? 0,
    wins: wins ?? 0,
    giveaways: giveaways ?? 0,
    activeGiveaways: active ?? 0,
  };
}