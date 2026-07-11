import {
  Pencil,
  Trash2,
  Eye,
  Calendar,
  Trophy,
} from "lucide-react";

export default function GiveawayTable({
  giveaways = [],
  loading = false,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
        <div className="animate-spin h-10 w-10 rounded-full border-4 border-blue-600 border-t-transparent mx-auto"></div>

        <p className="mt-4 text-slate-500">
          Loading giveaways...
        </p>
      </div>
    );
  }

  if (giveaways.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-12 text-center">

        <GiftIcon />

        <h2 className="text-2xl font-bold mt-4">
          No Giveaways Found
        </h2>

        <p className="text-slate-500 mt-2">
          Create your first giveaway.
        </p>

      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-slate-50">

            <tr>

              <th className="px-6 py-4 text-left">
                Giveaway
              </th>

              <th className="px-6 py-4">
                Category
              </th>

              <th className="px-6 py-4">
                Prize
              </th>

              <th className="px-6 py-4">
                Entries
              </th>

              <th className="px-6 py-4">
                Status
              </th>

              <th className="px-6 py-4">
                Ends
              </th>

              <th className="px-6 py-4">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {giveaways.map((item) => (

              <tr
                key={item.id}
                className="border-t hover:bg-slate-50 transition"
              >

                <td className="px-6 py-5">

                  <div className="flex items-center gap-4">

                    <img
                      src={
                        item.image_url ||
                        "https://placehold.co/80x80"
                      }
                      alt={item.title}
                      className="w-16 h-16 rounded-xl object-cover"
                    />

                    <div>

                      <h3 className="font-bold">

                        {item.title}

                      </h3>

                      <p className="text-sm text-slate-500 line-clamp-2">

                        {item.description}

                      </p>

                    </div>

                  </div>

                </td>

                <td className="px-6 py-5">

                  {item.category}

                </td>

                <td className="px-6 py-5">

                  <div>

                    <p className="font-semibold">

                      {item.prize}

                    </p>

                    <small className="text-slate-500">

                      KES {Number(item.prize_value || 0).toLocaleString()}

                    </small>

                  </div>

                </td>

                <td className="px-6 py-5">

                  {item.current_entries || 0}

                  /

                  {item.max_entries}

                </td>

                <td className="px-6 py-5">

                  <StatusBadge
                    status={item.status}
                  />

                </td>

                <td className="px-6 py-5">

                  <div className="flex items-center gap-2">

                    <Calendar size={16} />

                    {item.end_date}

                  </div>

                </td>

                <td className="px-6 py-5">

                  <div className="flex gap-2">

                    <button
                      className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200"
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      onClick={() => onEdit(item)}
                      className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-700"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => onDelete(item)}
                      className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    active:
      "bg-green-100 text-green-700",

    draft:
      "bg-yellow-100 text-yellow-700",

    ended:
      "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-semibold ${
        styles[status] || "bg-slate-100"
      }`}
    >
      {status}
    </span>
  );
}

function GiftIcon() {
  return (
    <div className="mx-auto w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">

      <Trophy
        size={40}
        className="text-blue-600"
      />

    </div>
  );
}