export default function StatsCard({
  title,
  value,
  icon,
  color = "bg-blue-600",
}) {
  const Icon = icon;

  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-gray-500">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {value}
          </h2>

        </div>

        <div
          className={`${color} p-4 rounded-xl text-white`}
        >
          <Icon size={28} />
        </div>

      </div>

    </div>
  );
}