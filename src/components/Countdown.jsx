import { Clock } from "lucide-react";

export default function Countdown({ days = 7 }) {
  return (
    <div className="flex items-center gap-2 text-red-600 font-semibold mt-3">
      <Clock size={18} />
      <span>{days} Days Remaining</span>
    </div>
  );
}