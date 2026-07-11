import Card from "./Card";
import EmptyState from "./EmptyState";

export default function DataTable({
  columns = [],
  data = [],
  loading = false,
}) {
  return (
    <Card>

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead>

            <tr className="bg-slate-50 border-b">

              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-5 py-4 text-left text-sm font-bold text-slate-700"
                >
                  {column.label}
                </th>
              ))}

            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>

                <td
                  colSpan={columns.length}
                  className="text-center py-10"
                >
                  Loading...
                </td>

              </tr>

            ) : data.length === 0 ? (

              <tr>

                <td colSpan={columns.length}>

                  <EmptyState
                    title="No Records"
                    description="Nothing to display."
                  />

                </td>

              </tr>

            ) : (

              data.map((row, index) => (

                <tr
                  key={index}
                  className="border-b hover:bg-slate-50"
                >

                  {columns.map((column) => (

                    <td
                      key={column.key}
                      className="px-5 py-4"
                    >
                      {column.render
                        ? column.render(row)
                        : row[column.key]}
                    </td>

                  ))}

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </Card>
  );
}