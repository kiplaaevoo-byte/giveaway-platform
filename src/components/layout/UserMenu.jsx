import { LogOut, User, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function UserMenu() {

  const { user, signOut } = useAuth();

  return (

    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-50">

      <div className="p-5 border-b">

        <h3 className="font-bold">
          {user?.email}
        </h3>

        <p className="text-slate-500 text-sm">
          Logged in
        </p>

      </div>

      <Link
        to="/profile"
        className="flex items-center gap-3 px-5 py-4 hover:bg-slate-50"
      >
        <User size={18} />
        Profile
      </Link>

      <Link
        to="/admin/settings"
        className="flex items-center gap-3 px-5 py-4 hover:bg-slate-50"
      >
        <Settings size={18} />
        Settings
      </Link>

      <button
        onClick={signOut}
        className="w-full text-left flex items-center gap-3 px-5 py-4 hover:bg-red-50 text-red-600"
      >
        <LogOut size={18} />
        Logout
      </button>

    </div>

  );

}