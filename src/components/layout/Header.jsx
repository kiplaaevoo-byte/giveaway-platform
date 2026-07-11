import { Bell, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Header() {

  const navigate = useNavigate();
  const { user } = useAuth();

  return (

    <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between">

      <div>

        <h1 className="text-2xl font-bold text-slate-800">
          Giveaway Platform
        </h1>

        <p className="text-slate-500 text-sm">
          Enterprise Dashboard
        </p>

      </div>

      <div className="flex items-center gap-5">

        <div className="relative hidden md:block">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            placeholder="Search..."
            className="pl-11 pr-4 py-3 rounded-xl border border-slate-300 w-72 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
          />

        </div>

        <button className="relative p-3 rounded-xl hover:bg-slate-100">

          <Bell size={20} />

          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500"></span>

        </button>

        <button
          onClick={() => navigate("/profile")}
          className="flex items-center gap-3 rounded-xl hover:bg-slate-100 px-3 py-2"
        >

          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold uppercase">

            {user?.email?.charAt(0) || "U"}

          </div>

          <div className="hidden lg:block text-left">

            <div className="font-semibold">

              {user?.email || "Guest"}

            </div>

            <div className="text-xs text-slate-500">

              Administrator

            </div>

          </div>

        </button>

      </div>

    </header>

  );

}