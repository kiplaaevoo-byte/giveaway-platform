import {
  Trophy,
  Ticket,
  Gift,
  Star,
} from "lucide-react";

export default function ProfileStats({ stats }) {
  const cards = [
    {
      title: "Entries",
      value: stats.entries,
      icon: Ticket,
      color: "bg-blue-600",
    },
    {
      title: "Wins",
      value: stats.wins,
      icon: Trophy,
      color: "bg-green-600",
    },
    {
      title: "Active",
      value: stats.active,
      icon: Gift,
      color: "bg-purple-600",
    },
    {
      title: "Win Rate",
      value: `${stats.rate}%`,
      icon: Star,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="bg-white rounded-xl shadow p-6"
          >
            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500">
                  {card.title}
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {card.value}
                </h2>

              </div>

              <div
                className={`${card.color} p-4 rounded-xl text-white`}
              >
                <Icon size={28} />
              </div>

            </div>
          </div>
        );
      })}

    </div>
  );
}