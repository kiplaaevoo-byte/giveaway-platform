import { RefreshCw, Plus } from "lucide-react";
import Button from "../ui/Button";

export default function DashboardHeader({
  title = "Admin Dashboard",
  subtitle = "Manage your giveaway platform",
  onRefresh,
  onCreate,
}) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          {title}
        </h1>

        <p className="text-slate-500 mt-2">
          {subtitle}
        </p>
      </div>

      <div className="flex gap-3">

        <Button
          variant="outline"
          icon={RefreshCw}
          onClick={onRefresh}
        >
          Refresh
        </Button>

        <Button
          icon={Plus}
          onClick={onCreate}
        >
          New Giveaway
        </Button>

      </div>

    </div>
  );
}