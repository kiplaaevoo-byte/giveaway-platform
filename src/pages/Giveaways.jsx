import { useEffect, useMemo, useState } from "react";

import GiveawayGrid from "../components/giveaway/GiveawayGrid";
import GiveawayFilters from "../components/giveaway/GiveawayFilters";

import { getGiveaways } from "../services/giveawayService";

export default function Giveaways() {
  const [giveaways, setGiveaways] = useState([]);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  const [sort, setSort] = useState("newest");

  useEffect(() => {
    async function load() {
      try {
        const data = await getGiveaways();

        setGiveaways(data);
      } catch (err) {
        console.error(err);
      }
    }

    load();
  }, []);

  const filtered = useMemo(() => {
    let list = [...giveaways];

    if (search) {
      list = list.filter((g) =>
        g.title
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (category !== "All") {
      list = list.filter(
        (g) => g.category === category
      );
    }

    switch (sort) {
      case "oldest":
        list.sort(
          (a, b) =>
            new Date(a.created_at) -
            new Date(b.created_at)
        );
        break;

      case "prize_high":
        list.sort(
          (a, b) =>
            b.prize_value - a.prize_value
        );
        break;

      case "prize_low":
        list.sort(
          (a, b) =>
            a.prize_value - b.prize_value
        );
        break;

      case "ending":
        list.sort(
          (a, b) =>
            new Date(a.end_date) -
            new Date(b.end_date)
        );
        break;

      default:
        list.sort(
          (a, b) =>
            new Date(b.created_at) -
            new Date(a.created_at)
        );
    }

    return list;

  }, [
    giveaways,
    search,
    category,
    sort,
  ]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">

      <h1 className="text-4xl font-bold mb-2">
        Giveaways
      </h1>

      <p className="text-gray-500 mb-8">
        Browse all active giveaways.
      </p>

      <GiveawayFilters
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
      />

      <GiveawayGrid giveaways={filtered} />

    </div>
  );
}