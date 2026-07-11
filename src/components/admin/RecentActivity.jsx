import {
  Clock,
  Gift,
  Trophy,
  Ticket,
  UserPlus,
} from "lucide-react";

const icons = {
  giveaway: Gift,
  winner: Trophy,
  entry: Ticket,
  user: UserPlus,
};

export default function RecentActivity({
  activities = [],
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-xl font-bold">
          Recent Activity
        </h2>

        <Clock size={18} />

      </div>

      {activities.length === 0 ? (

        <div className="text-center py-16 text-slate-500">
          No recent activity.
        </div>

      ) : (

        <div className="space-y-4">

          {activities.map((item) => {

            const Icon = icons[item.type] || Clock;

            return (

              <div
                key={item.id}
                className="flex items-center gap-4 border-b pb-4 last:border-0"
              >

                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">

                  <Icon
                    size={22}
                    className="text-blue-600"
                  />

                </div>

                <div className="flex-1">

                  <h4 className="font-semibold">
                    {item.title}
                  </h4>

                  <p className="text-sm text-slate-500">
                    {item.description}
                  </p>

                </div>

                <small className="text-slate-400">
                  {item.time}
                </small>

              </div>

            );

          })}

        </div>

      )}

    </div>
  );
}