import {
  Plus,
  Trophy,
  Users,
  Bell,
} from "lucide-react";

export default function QuickActions() {
  const actions = [
    {
      icon: Plus,
      text: "Create Giveaway",
    },
    {
      icon: Trophy,
      text: "Draw Winner",
    },
    {
      icon: Users,
      text: "View Users",
    },
    {
      icon: Bell,
      text: "Send Notice",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <h2 className="font-bold text-xl mb-6">
        Quick Actions
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        {actions.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.text}
              className="border rounded-xl p-5 hover:bg-blue-50 transition"
            >
              <Icon className="mx-auto text-blue-600" />

              <p className="mt-3 font-semibold">
                {item.text}
              </p>
            </button>
          );
        })}

      </div>

    </div>
  );
}