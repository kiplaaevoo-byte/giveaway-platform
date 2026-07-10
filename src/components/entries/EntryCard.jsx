export default function EntryCard({ entry }) {
  return (
    <div className="bg-white rounded-xl shadow p-5">

      <h3 className="font-bold text-lg">
        {entry.giveaways?.title}
      </h3>

      <p className="text-gray-500 mt-2">
        Ticket
      </p>

      <p className="font-mono">
        {entry.ticket_number}
      </p>

      <p className="mt-3">
        Status:
      </p>

      <span className="inline-block mt-1 px-3 py-1 rounded-full bg-green-100 text-green-700">
        {entry.giveaways?.status || "Active"}
      </span>

      <p className="text-sm text-gray-500 mt-4">
        {new Date(entry.created_at).toLocaleDateString()}
      </p>

    </div>
  );
}