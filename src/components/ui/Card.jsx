import clsx from "clsx";

export default function Card({
  children,
  title,
  subtitle,
  className = "",
  footer,
}) {
  return (
    <div
      className={clsx(
        "bg-white rounded-2xl border border-slate-200 shadow-sm",
        "transition-all duration-300 hover:shadow-lg",
        className
      )}
    >
      {(title || subtitle) && (
        <div className="px-6 py-5 border-b border-slate-100">
          {title && (
            <h2 className="text-xl font-bold text-slate-800">
              {title}
            </h2>
          )}

          {subtitle && (
            <p className="text-slate-500 mt-1">
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div className="p-6">
        {children}
      </div>

      {footer && (
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 rounded-b-2xl">
          {footer}
        </div>
      )}
    </div>
  );
}