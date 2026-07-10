import GiveawayCard from "./GiveawayCard";

export default function GiveawayGrid({
  giveaways,
}) {
  if (!giveaways.length) {
    return (
      <div className="text-center py-20">

        <h2 className="text-2xl font-bold">
          No Giveaways Found
        </h2>

        <p className="text-gray-500 mt-2">
          Check back later for new giveaways.
        </p>

      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

      {giveaways.map((giveaway) => (
        <GiveawayCard
          key={giveaway.id}
          giveaway={giveaway}
        />
      ))}

    </div>
  );
}