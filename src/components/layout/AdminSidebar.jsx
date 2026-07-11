import {
  LayoutDashboard,
  Gift,
  Ticket,
  Trophy,
  Users,
  Bell,
  BarChart3,
  Settings,
  LogOut
} from "lucide-react";

import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function AdminSidebar() {

  const { signOut } = useAuth();

  const links = [

    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin"
    },

    {
      title: "Giveaways",
      icon: Gift,
      path: "/admin/giveaways"
    },

    {
      title: "Entries",
      icon: Ticket,
      path: "/admin/entries"
    },

    {
      title: "Users",
      icon: Users,
      path: "/admin/users"
    },

    {
      title: "Winners",
      icon: Trophy,
      path: "/admin/winners"
    },

    {
      title: "Notifications",
      icon: Bell,
      path: "/admin/notifications"
    },

    {
      title: "Reports",
      icon: BarChart3,
      path: "/admin/reports"
    },

    {
      title: "Settings",
      icon: Settings,
      path: "/admin/settings"
    }

  ];

  return (

    <aside className="hidden lg:flex w-72 bg-slate-900 text-white flex-col">

      <div className="h-20 flex items-center px-8 border-b border-slate-800">

        <h2 className="text-2xl font-bold">

          🎁 Giveaway Pro

        </h2>

      </div>

      <nav className="flex-1 p-5 space-y-2">

        {

          links.map(item => {

            const Icon = item.icon;

            return (

              <NavLink

                key={item.path}

                to={item.path}

                className={({ isActive }) =>

                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "hover:bg-slate-800 text-slate-300"
                  }`

                }

              >

                <Icon size={20} />

                <span>

                  {item.title}

                </span>

              </NavLink>

            );

          })

        }

      </nav>

      <div className="p-5 border-t border-slate-800">

        <button

          onClick={signOut}

          className="w-full flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 rounded-xl py-3 font-semibold"

        >

          <LogOut size={18} />

          Logout

        </button>

      </div>

    </aside>

  );

}