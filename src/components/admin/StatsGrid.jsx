import {
  Gift,
  Users,
  Ticket,
  Trophy,
} from "lucide-react";

import StatCard from "../ui/StatCard";

export default function StatsGrid({
  giveaways,
  users,
  entries,
  winners,
}) {
  return (

    <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-6">

      <StatCard
        title="Giveaways"
        value={giveaways}
        icon={Gift}
        color="bg-blue-600"
      />

      <StatCard
        title="Users"
        value={users}
        icon={Users}
        color="bg-green-600"
      />

      <StatCard
        title="Entries"
        value={entries}
        icon={Ticket}
        color="bg-orange-500"
      />

      <StatCard
        title="Winners"
        value={winners}
        icon={Trophy}
        color="bg-purple-600"
      />

    </div>

  );
}