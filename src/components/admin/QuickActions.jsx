import {
  Gift,
  Trophy,
  Bell,
  Users,
} from "lucide-react";

import { Link } from "react-router-dom";

const actions = [

  {
    title: "Create Giveaway",
    icon: Gift,
    color: "bg-blue-600",
    path: "/admin/giveaways",
  },

  {
    title: "Pick Winner",
    icon: Trophy,
    color: "bg-green-600",
    path: "/admin/winners",
  },

  {
    title: "Send Notice",
    icon: Bell,
    color: "bg-purple-600",
    path: "/admin/notifications",
  },

  {
    title: "Manage Users",
    icon: Users,
    color: "bg-orange-600",
    path: "/admin/users",
  },

];

export default function QuickActions() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

      <h2 className="text-xl font-bold mb-6">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-4">

        {actions.map((item) => {

          const Icon = item.icon;

          return (

            <Link
              key={item.title}
              to={item.path}
              className="rounded-xl border hover:shadow-lg transition p-5 text-center"
            >

              <div
                className={`${item.color} w-14 h-14 rounded-xl flex items-center justify-center mx-auto text-white`}
              >
                <Icon size={26} />
              </div>

              <p className="mt-4 font-semibold">
                {item.title}
              </p>

            </Link>

          );

        })}

      </div>

    </div>
  );
}