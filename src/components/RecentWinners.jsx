import WinnerCard from "./WinnerCard";

const winners = [
  {
    winner: "John Doe",
    prize: "Samsung Galaxy S25",
    date: "20 July 2026",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43?w=800",
  },
  {
    winner: "Jane Smith",
    prize: "KES 100,000 Cash",
    date: "18 July 2026",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800",
  },
  {
    winner: "Peter Kim",
    prize: "PlayStation 5",
    date: "12 July 2026",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800",
  },
];

export default function RecentWinners() {
  return (
    <section className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center">
          Recent Winners
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">

          {winners.map((winner, index) => (
            <WinnerCard key={index} {...winner} />
          ))}

        </div>

      </div>

    </section>
  );
}