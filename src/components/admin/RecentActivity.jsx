export default function RecentActivity() {
  const activities = [
    "John entered Samsung S25 Giveaway",
    "Mary won KES 50,000 Cash Giveaway",
    "New giveaway created",
    "Administrator updated platform settings",
  ];

  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <h2 className="font-bold text-xl mb-6">
        Recent Activity
      </h2>

      <div className="space-y-4">

        {activities.map((activity, index) => (
          <div
            key={index}
            className="border-l-4 border-blue-600 pl-4"
          >
            {activity}
          </div>
        ))}

      </div>

    </div>
  );
}