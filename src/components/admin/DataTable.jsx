import { Search } from "lucide-react";
import { useMemo, useState } from "react";

export default function DataTable({
  title = "Data Table",
  columns = [],
  data = [],
  loading = false,
  searchable = true,
  actions = null,
}) {
  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    if (!search.trim()) return data;

    return data.filter((row) =>
      Object.values(row).some((value) =>
        String(value ?? "")
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    );
  }, [data, search]);

  return (
    <div className="bg-white rounded-2xl shadow">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 border-b">

        <h2 className="text-xl font-bold">
          {title}
        </h2>

        {searchable && (
          <div className="relative w-full md:w-80">

            <Search
              size={18}
              className="absolute left-3 top-3.5 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full border rounded-xl pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-blue-500"
            />

          </div>
        )}

      </div>

      {/* Table */}

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-slate-50">

            <tr>

              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-5 py-4 text-left text-sm font-semibold text-gray-700"
                >
                  {column.label}
                </th>
              ))}

              {actions && (
                <th className="px-5 py-4 text-center text-sm font-semibold text-gray-700">
                  Actions
                </th>
              )}

            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>

                <td
                  colSpan={
                    columns.length +
                    (actions ? 1 : 0)
                  }
                  className="py-12 text-center text-gray-500"
                >
                  Loading...
                </td>

              </tr>

            ) : filteredData.length === 0 ? (

              <tr>

                <td
                  colSpan={
                    columns.length +
                    (actions ? 1 : 0)
                  }
                  className="py-12 text-center text-gray-500"
                >
                  No records found.
                </td>

              </tr>

            ) : (

              filteredData.map((row, index) => (

                <tr
                  key={row.id ?? index}
                  className="border-b hover:bg-slate-50 transition"
                >

                  {columns.map((column) => (

                    <td
                      key={column.key}
                      className="px-5 py-4 text-sm text-gray-700"
                    >
                      {column.render
                        ? column.render(row)
                        : row[column.key]}
                    </td>

                  ))}

                  {actions && (

                    <td className="px-5 py-4">

                      <div className="flex justify-center gap-2">

                        {actions(row)}

                      </div>

                    </td>

                  )}

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}