import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function Breadcrumb({
  items = [],
}) {
  return (
    <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">

      <Link
        to="/"
        className="flex items-center gap-1 hover:text-blue-600"
      >
        <Home size={15} />
        Home
      </Link>

      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-2"
        >
          <ChevronRight size={14} />

          {item.path ? (
            <Link
              to={item.path}
              className="hover:text-blue-600"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-semibold text-slate-700">
              {item.label}
            </span>
          )}
        </div>
      ))}

    </div>
  );
}