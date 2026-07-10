import { CalendarDays, UserCircle } from "lucide-react";
import useAuth from "../../hooks/useAuth";

export default function DashboardHeader() {
  const { user } = useAuth();

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const fullName =
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "User";

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row justify-between items-center gap-6">

      <div>

        <h1 className="text-3xl font-bold text-slate-800">
          Welcome back, {fullName} 👋
        </h1>

        <p className="text-gray-500 mt-2">
          Here's what's happening with your giveaways today.
        </p>

        <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">

          <CalendarDays size={18} />

          {today}

        </div>

      </div>

      <div className="flex items-center gap-4">

        <div className="text-right">

          <p className="font-semibold text-slate-700">
            {fullName}
          </p>

          <p className="text-gray-500 text-sm">
            {user?.email}
          </p>

        </div>

        <UserCircle
          size={60}
          className="text-blue-600"
        />

      </div>

    </div>
  );
}