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

  return data;
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
// ENTER GIVEAWAY
// ======================================

export async function enterGiveaway(giveawayId, userId) {
  // Check if the user has already entered
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

  // Generate unique ticket number
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
    .select(
      `
      *,
      giveaways (
        id,
        title,
        prize,
        image,
        status,
        end_date
      )
      `
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

// ======================================
// GET WINNERS
// ======================================

export async function getWinners() {
  const { data, error } = await supabase
    .from("winners")
    .select(
      `
      *,
      giveaways (
        id,
        title,
        prize
      ),
      profiles (
        full_name
      )
      `
    )
    .order("announced_at", { ascending: false });

  if (error) throw error;

  return data;
}

// ======================================
// DASHBOARD STATS
// ======================================

export async function getDashboardStats(userId) {
  const { count: entriesCount, error: entriesError } = await supabase
    .from("entries")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("user_id", userId);

  if (entriesError) throw entriesError;

  const { count: winsCount, error: winsError } = await supabase
    .from("winners")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("user_id", userId);

  if (winsError) throw winsError;

  const { count: giveawaysCount, error: giveawaysError } = await supabase
    .from("giveaways")
    .select("*", {
      count: "exact",
      head: true,
    });

  if (giveawaysError) throw giveawaysError;

  return {
    entries: entriesCount ?? 0,
    wins: winsCount ?? 0,
    giveaways: giveawaysCount ?? 0,
  };
}