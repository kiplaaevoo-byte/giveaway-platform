import Countdown from "./Countdown";

export default function GiveawayCard({
  title,
  image,
  prize,
  entries,
  endDate,
}) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300">

      <img
        src={image}
        alt={title}
        className="w-full h-56 object-cover"
      />

      <div className="p-6">

        <h3 className="text-2xl font-bold">
          {title}
        </h3>

        <p className="mt-3 text-gray-600">
          Prize:
          <span className="font-semibold">
            {" "}
            {prize}
          </span>
        </p>

        <p className="mt-2 text-gray-500">
          {entries.toLocaleString()} Entries
        </p>

        <Countdown days={7} />

        <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl">
          Join Giveaway
        </button>

      </div>
    </div>
  );
}