import { useEffect, useState } from "react";
import {
  Gift,
  Users,
  Ticket,
  Trophy,
} from "lucide-react";

import AdminSidebar from "../components/admin/AdminSidebar";
import AdminHeader from "../components/admin/AdminHeader";
import StatsCard from "../components/admin/StatsCard";
import QuickActions from "../components/admin/QuickActions";
import RecentActivity from "../components/admin/RecentActivity";

import { supabase } from "../lib/supabase";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    giveaways: 0,
    users: 0,
    entries: 0,
    winners: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const [
        giveaways,
        users,
        entries,
        winners,
      ] = await Promise.all([
        supabase
          .from("giveaways")
          .select("*", {
            count: "exact",
            head: true,
          }),

        supabase
          .from("profiles")
          .select("*", {
            count: "exact",
            head: true,
          }),

        supabase
          .from("entries")
          .select("*", {
            count: "exact",
            head: true,
          }),

        supabase
          .from("winners")
          .select("*", {
            count: "exact",
            head: true,
          }),
      ]);

      setStats({
        giveaways: giveaways.count || 0,
        users: users.count || 0,
        entries: entries.count || 0,
        winners: winners.count || 0,
      });
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  return (
    <div className="flex bg-slate-100 min-h-screen">

      <AdminSidebar />

      <main className="flex-1 p-8">

        <AdminHeader />

        {loading ? (
          <div className="mt-10 text-center text-gray-500">
            Loading dashboard...
          </div>
        ) : (
          <>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mt-8">

              <StatsCard
                title="Giveaways"
                value={stats.giveaways}
                icon={Gift}
                color="bg-blue-600"
              />

              <StatsCard
                title="Users"
                value={stats.users}
                icon={Users}
                color="bg-green-600"
              />

              <StatsCard
                title="Entries"
                value={stats.entries}
                icon={Ticket}
                color="bg-orange-600"
              />

              <StatsCard
                title="Winners"
                value={stats.winners}
                icon={Trophy}
                color="bg-purple-600"
              />

            </div>

            <div className="grid lg:grid-cols-2 gap-6 mt-8">

              <QuickActions />

              <RecentActivity />

            </div>

          </>
        )}

      </main>

    </div>
  );
}