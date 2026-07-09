import GiveawayCard from "./GiveawayCard";

const giveaways = [
  {
    title: "iPhone 17 Pro Giveaway",
    prize: "Apple iPhone 17 Pro",
    entries: 4215,
    endDate: "30 July 2026",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800",
  },
  {
    title: "MacBook Pro Giveaway",
    prize: "MacBook Pro M4",
    entries: 2189,
    endDate: "10 August 2026",
    image:
      "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?w=800",
  },
  {
    title: "Shopping Voucher",
    prize: "KES 50,000 Voucher",
    entries: 1821,
    endDate: "18 August 2026",
    image:
      "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=800",
  },
];

export default function FeaturedGiveaways() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center">
          Featured Giveaways
        </h2>

        <p className="text-center text-gray-600 mt-4">
          Join today for your chance to win amazing prizes.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {giveaways.map((item, index) => (
            <GiveawayCard key={index} {...item} />
          ))}
        </div>

      </div>
    </section>
  );
}