export default function ActivityTimeline({
  items = [],
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

      <h2 className="text-xl font-bold mb-6">
        Activity Timeline
      </h2>

      <div className="space-y-6">

        {items.length === 0 ? (

          <p className="text-slate-500">
            No activity available.
          </p>

        ) : (

          items.map((item) => (

            <div
              key={item.id}
              className="flex gap-4"
            >

              <div className="w-4 flex justify-center">

                <div className="w-3 h-3 rounded-full bg-blue-600 mt-2"></div>

              </div>

              <div>

                <h4 className="font-semibold">
                  {item.title}
                </h4>

                <p className="text-slate-500">
                  {item.description}
                </p>

                <small className="text-slate-400">
                  {item.time}
                </small>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}