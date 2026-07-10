import {
  LayoutDashboard,
  Gift,
  Users,
  Ticket,
  Trophy,
  Bell,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menu = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin",
  },
  {
    name: "Giveaways",
    icon: Gift,
    path: "/admin/giveaways",
  },
  {
    name: "Entries",
    icon: Ticket,
    path: "/admin/entries",
  },
  {
    name: "Users",
    icon: Users,
    path: "/admin/users",
  },
  {
    name: "Winners",
    icon: Trophy,
    path: "/admin/winners",
  },
  {
    name: "Reports",
    icon: BarChart3,
    path: "/admin/reports",
  },
  {
    name: "Notifications",
    icon: Bell,
    path: "/admin/notifications",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/admin/settings",
  },
];

export default function AdminSidebar() {
  return (
    <aside className="w-72 bg-slate-900 text-white min-h-screen">

      <div className="p-6 border-b border-slate-700">

        <h1 className="text-2xl font-bold">
          Giveaway Admin
        </h1>

        <p className="text-slate-400 text-sm mt-1">
          Management Portal
        </p>

      </div>

      <nav className="p-4 space-y-2">

        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  isActive
                    ? "bg-blue-600"
                    : "hover:bg-slate-800"
                }`
              }
            >
              <Icon size={20} />

              {item.name}
            </NavLink>
          );
        })}

      </nav>

      <div className="absolute bottom-6 left-4 right-4">

        <button className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-xl flex justify-center items-center gap-2">

          <LogOut size={18} />

          Logout

        </button>

      </div>

    </aside>
  );
}