import { Bell } from "lucide-react";

export default function AdminHeader() {
  return (
    <header className="bg-white shadow rounded-2xl p-6 flex justify-between items-center">

      <div>

        <h2 className="text-3xl font-bold">
          Admin Dashboard
        </h2>

        <p className="text-gray-500">
          Welcome back Administrator
        </p>

      </div>

      <button className="relative">

        <Bell size={24} />

        <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs px-2">
          3
        </span>

      </button>

    </header>
  );
}