import { TrendingUp } from "lucide-react";

export default function StatCard({
  title,
  value,
  icon: Icon,
  color = "bg-blue-600",
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-gray-500 text-sm">
            {title}
          </p>

          <h2 className="text-3xl font-bold text-slate-800 mt-2">
            {value}
          </h2>

          <div className="flex items-center gap-1 text-green-600 mt-4 text-sm">

            <TrendingUp size={16} />

            Live

          </div>

        </div>

        <div
          className={`${color} h-16 w-16 rounded-xl flex items-center justify-center`}
        >
          {Icon && (
            <Icon
              size={30}
              className="text-white"
            />
          )}
        </div>

      </div>

    </div>
  );
}