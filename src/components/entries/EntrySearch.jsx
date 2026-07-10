export default function EntrySearch({
  search,
  setSearch,
}) {
  return (
    <input
      type="text"
      placeholder="Search ticket or giveaway..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full md:w-80 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
    />
  );
}
