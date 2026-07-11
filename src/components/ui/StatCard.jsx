import Card from "./Card";

export default function StatCard({
  title,
  value,
  icon: Icon,
  color = "bg-blue-600",
  subtitle = "",
}) {
  return (
    <Card className="hover:-translate-y-1 transition-all duration-300">

      <div className="flex justify-between items-start">

        <div>

          <p className="text-slate-500 font-medium">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {value}
          </h2>

          {subtitle && (
            <p className="mt-2 text-sm text-slate-500">
              {subtitle}
            </p>
          )}

        </div>

        <div
          className={`${color} text-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg`}
        >
          {Icon && <Icon size={28} />}
        </div>

      </div>

    </Card>
  );
}