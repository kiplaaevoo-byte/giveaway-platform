import { Link } from "react-router-dom";

export default function RecentEntries({ entries = [], loading = false }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-xl font-bold text-slate-800">
          Recent Entries
        </h2>

        <Link
          to="/my-entries"
          className="text-blue-600 hover:underline font-medium"
        >
          View All
        </Link>

      </div>

      {loading ? (
        <div className="py-10 text-center text-gray-500">
          Loading entries...
        </div>
      ) : entries.length === 0 ? (
        <div className="py-10 text-center text-gray-500">
          You haven't entered any giveaways yet.
        </div>
      ) : (
        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left py-3">Prize</th>

                <th className="text-left py-3">Ticket</th>

                <th className="text-left py-3">Status</th>

                <th className="text-left py-3">Date</th>

              </tr>

            </thead>

            <tbody>

              {entries.map((entry) => (
                <tr
                  key={entry.id}
                  className="border-b hover:bg-slate-50"
                >

                  <td className="py-4">
                    {entry.giveaways?.title || "Giveaway"}
                  </td>

                  <td className="py-4 font-mono">
                    {entry.ticket_number}
                  </td>

                  <td className="py-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium
                        ${
                          entry.status === "Won"
                            ? "bg-green-100 text-green-700"
                            : entry.status === "Ended"
                            ? "bg-red-100 text-red-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                    >
                      {entry.status || "Active"}
                    </span>

                  </td>

                  <td className="py-4">
                    {new Date(entry.created_at).toLocaleDateString()}
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}