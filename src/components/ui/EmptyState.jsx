import { Inbox } from "lucide-react";

export default function EmptyState({
  title = "Nothing Found",
  description = "There is no data available.",
  action = null,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">

      <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center">
        <Inbox size={40} className="text-slate-400" />
      </div>

      <h2 className="mt-6 text-2xl font-bold text-slate-800">
        {title}
      </h2>

      <p className="mt-2 text-slate-500 max-w-md">
        {description}
      </p>

      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}

    </div>
  );
}