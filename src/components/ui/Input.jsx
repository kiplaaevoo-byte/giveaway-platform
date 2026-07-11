import clsx from "clsx";

export default function Input({
  label,
  error,
  icon: Icon,
  className = "",
  ...props
}) {
  return (
    <div className="space-y-2 w-full">
      {label && (
        <label className="text-sm font-semibold text-slate-700">
          {label}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <Icon
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
        )}

        <input
          className={clsx(
            "w-full rounded-xl border border-slate-300",
            "bg-white",
            "px-4 py-3",
            Icon && "pl-11",
            "focus:border-blue-500",
            "focus:ring-4",
            "focus:ring-blue-100",
            "outline-none",
            "transition-all",
            error &&
              "border-red-500 focus:border-red-500 focus:ring-red-100",
            className
          )}
          {...props}
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm">
          {error}
        </p>
      )}
    </div>
  );
}