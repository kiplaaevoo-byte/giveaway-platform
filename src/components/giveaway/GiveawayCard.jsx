import { Link } from "react-router-dom";
import {
  Users,
  Gift,
} from "lucide-react";

import GiveawayCountdown from "./GiveawayCountdown";
import CategoryBadge from "./CategoryBadge";

export default function GiveawayCard({ giveaway }) {
  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden">

      <img
        src={
          giveaway.image_url ||
          "https://placehold.co/600x400?text=Giveaway"
        }
        alt={giveaway.title}
        className="w-full h-52 object-cover"
      />

      <div className="p-5">

        <div className="flex justify-between items-center mb-3">

          <CategoryBadge
            category={giveaway.category}
          />

          <span className="text-sm text-gray-500">
            #{giveaway.id.slice(0, 6)}
          </span>

        </div>

        <h2 className="text-xl font-bold">
          {giveaway.title}
        </h2>

        <p className="text-gray-600 mt-2 line-clamp-2">
          {giveaway.description}
        </p>

        <div className="mt-5 flex justify-between">

          <div className="flex items-center gap-2">

            <Gift
              size={18}
              className="text-green-600"
            />

            <span className="font-semibold">
              KES {giveaway.prize_value}
            </span>

          </div>

          <div className="flex items-center gap-2">

            <Users
              size={18}
              className="text-blue-600"
            />

            {giveaway.current_entries}

          </div>

        </div>

        <div className="mt-5 flex justify-between items-center">

          <GiveawayCountdown
            endDate={giveaway.end_date}
          />

          <Link
            to={`/giveaways/${giveaway.id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            View
          </Link>

        </div>

      </div>

    </div>
  );
}