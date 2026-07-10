import { useEffect, useState } from "react";

import {
  Gift,
  Ticket,
  Trophy,
  ClipboardList,
} from "lucide-react";

import useAuth from "../hooks/useAuth";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatCard from "../components/dashboard/StatCard";
import RecentEntries from "../components/dashboard/RecentEntries";
import QuickActions from "../components/dashboard/QuickActions";

import {
  getDashboardStats,
  getRecentEntries,
} from "../services/dashboardService";

export default function Dashboard() {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    entries: 0,
    giveaways: 0,
    wins: 0,
    tickets: 0,
  });

  const [entries, setEntries] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      if (!user) return;

      setLoading(true);

      const statistics = await getDashboardStats(user.id);

      const recent = await getRecentEntries(user.id);

      setStats(statistics);

      setEntries(recent);

      setLoading(false);
    }

    loadDashboard();
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">

      <DashboardHeader />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8">

        <StatCard
          title="My Entries"
          value={stats.entries}
          icon={ClipboardList}
          color="bg-blue-600"
        />

        <StatCard
          title="Wins"
          value={stats.wins}
          icon={Trophy}
          color="bg-green-600"
        />

        <StatCard
          title="Active Giveaways"
          value={stats.giveaways}
          icon={Gift}
          color="bg-purple-600"
        />

        <StatCard
          title="Tickets"
          value={stats.tickets}
          icon={Ticket}
          color="bg-orange-500"
        />

      </div>

      <div className="mt-10">

        <RecentEntries
          entries={entries}
          loading={loading}
        />

      </div>

      <div className="mt-10">

        <QuickActions />

      </div>

    </div>
  );
}