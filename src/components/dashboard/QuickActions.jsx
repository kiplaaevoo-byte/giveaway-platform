import { Link } from "react-router-dom";

import {
  Gift,
  Ticket,
  User,
  Bell,
  Trophy,
} from "lucide-react";

export default function QuickActions() {
  const actions = [
    {
      title: "Browse Giveaways",
      icon: Gift,
      link: "/giveaways",
      color: "bg-blue-600",
    },
    {
      title: "My Entries",
      icon: Ticket,
      link: "/my-entries",
      color: "bg-green-600",
    },
    {
      title: "Profile",
      icon: User,
      link: "/profile",
      color: "bg-purple-600",
    },
    {
      title: "Notifications",
      icon: Bell,
      link: "/notifications",
      color: "bg-yellow-500",
    },
    {
      title: "Winners",
      icon: Trophy,
      link: "/winners",
      color: "bg-pink-600",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <h2 className="text-xl font-bold mb-6">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">

        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              to={action.link}
              className="rounded-xl border hover:shadow-lg transition p-5 flex flex-col items-center text-center"
            >

              <div
                className={`${action.color} h-14 w-14 rounded-xl flex items-center justify-center mb-3`}
              >
                <Icon
                  className="text-white"
                  size={26}
                />
              </div>

              <p className="font-semibold text-slate-700">
                {action.title}
              </p>

            </Link>
          );
        })}

      </div>

    </div>
  );
}