import { Link } from "react-router-dom";
import useGiveaways from "../hooks/useGiveaways";
import useAuth from "../hooks/useAuth";

export default function Giveaways() {
  const { giveaways, loading, error } = useGiveaways();
  const { user } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <h2 className="text-2xl font-semibold">
          Loading giveaways...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">

      <div className="text-center mb-10">

        <h1 className="text-4xl font-bold">
          Live Giveaways
        </h1>

        <p className="text-gray-500 mt-3">
          Enter today for your chance to win amazing prizes.
        </p>

      </div>

      {giveaways.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold">
            No giveaways available.
          </h2>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {giveaways.map((giveaway) => (

            <div
              key={giveaway.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >

              <img
                src={giveaway.image}
                alt={giveaway.title}
                className="w-full h-56 object-cover"
              />

              <div className="p-6">

                <h2 className="text-2xl font-bold">
                  {giveaway.title}
                </h2>

                <p className="mt-3 text-gray-600">
                  {giveaway.description}
                </p>

                <div className="mt-5">

                  <p>
                    <strong>Prize:</strong>{" "}
                    {giveaway.prize}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    <span className="text-green-600 font-semibold">
                      {giveaway.status}
                    </span>
                  </p>

                  <p>
                    <strong>Ends:</strong>{" "}
                    {giveaway.end_date}
                  </p>

                </div>

                <div className="mt-6">

                  {user ? (
                    <Link
                      to={`/giveaways/${giveaway.id}`}
                      className="block text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
                    >
                      View Giveaway
                    </Link>
                  ) : (
                    <Link
                      to="/login"
                      className="block text-center bg-gray-800 hover:bg-black text-white py-3 rounded-xl font-semibold"
                    >
                      Login to Enter
                    </Link>
                  )}

                </div>

              </div>

            </div>

          ))}

        </div>
      )}

    </section>
  );
}