import { Search } from "lucide-react";

const categories = [
  "All",
  "Smartphones",
  "Laptops",
  "Cars",
  "Motorbikes",
  "Cash",
  "Electronics",
  "Shopping",
  "Fashion",
  "Household",
  "Others",
];

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "prize_high", label: "Highest Prize" },
  { value: "prize_low", label: "Lowest Prize" },
  { value: "ending", label: "Ending Soon" },
];

export default function GiveawayFilters({
  search,
  setSearch,
  category,
  setCategory,
  sort,
  setSort,
}) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 mb-8">

      <div className="grid lg:grid-cols-3 gap-5">

        {/* Search */}

        <div className="relative">

          <Search
            className="absolute left-3 top-3.5 text-gray-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search giveaways..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-xl pl-10 pr-4 py-3"
          />

        </div>

        {/* Category */}

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-xl px-4 py-3"
        >
          {categories.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>

        {/* Sort */}

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border rounded-xl px-4 py-3"
        >
          {sortOptions.map((item) => (
            <option
              key={item.value}
              value={item.value}
            >
              {item.label}
            </option>
          ))}
        </select>

      </div>

    </div>
  );
}