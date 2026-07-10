import { Mail, Calendar } from "lucide-react";

export default function ProfileHeader({ user, profile }) {
  const joined = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString()
    : "Recently";

  return (
    <div className="bg-white rounded-2xl shadow p-8">

      <div className="flex flex-col md:flex-row items-center gap-6">

        <img
          src={
            profile?.avatar_url ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              profile?.full_name || user?.email || "User"
            )}&background=2563eb&color=fff`
          }
          alt="Avatar"
          className="w-28 h-28 rounded-full object-cover border-4 border-blue-100"
        />

        <div className="flex-1">

          <h1 className="text-3xl font-bold">
            {profile?.full_name || "New User"}
          </h1>

          <p className="text-gray-500 mt-2">
            @{profile?.username || "username"}
          </p>

          <div className="mt-4 flex flex-wrap gap-5 text-gray-600">

            <div className="flex items-center gap-2">
              <Mail size={18} />
              {user?.email}
            </div>

            <div className="flex items-center gap-2">
              <Calendar size={18} />
              Joined {joined}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}