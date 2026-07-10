export default function EntryTable({ entries }) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow">

      <table className="w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="text-left p-4">
              Giveaway
            </th>

            <th className="text-left p-4">
              Ticket
            </th>

            <th className="text-left p-4">
              Status
            </th>

            <th className="text-left p-4">
              Date
            </th>

          </tr>

        </thead>

        <tbody>

          {entries.map((entry) => (
            <tr
              key={entry.id}
              className="border-b hover:bg-slate-50"
            >

              <td className="p-4">
                {entry.giveaways?.title}
              </td>

              <td className="p-4 font-mono">
                {entry.ticket_number}
              </td>

              <td className="p-4">

                <span className="px-3 py-1 rounded-full bg-green-100 text-green-700">
                  {entry.giveaways?.status || "Active"}
                </span>

              </td>

              <td className="p-4">
                {new Date(entry.created_at).toLocaleDateString()}
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}