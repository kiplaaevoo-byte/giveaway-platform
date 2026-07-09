import { Users, Gift, Trophy, Wallet } from "lucide-react";

const stats = [
  {
    icon: <Users size={32} />,
    value: "15,245+",
    label: "Registered Users",
  },
  {
    icon: <Gift size={32} />,
    value: "128",
    label: "Active Giveaways",
  },
  {
    icon: <Trophy size={32} />,
    value: "943",
    label: "Winners",
  },
  {
    icon: <Wallet size={32} />,
    value: "KES 12M+",
    label: "Prizes Awarded",
  },
];

export default function Stats() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-1 transition"
            >
              <div className="flex justify-center mb-4">
                {item.icon}
              </div>

              <h2 className="text-3xl font-bold">
                {item.value}
              </h2>

              <p className="mt-2 text-blue-100">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}