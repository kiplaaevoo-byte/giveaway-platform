import { Link } from "react-router-dom";
import { Gift, Trophy } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-800 text-white">

      <div className="max-w-7xl mx-auto px-6 py-24">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div>

            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6">
              <Gift size={18} />
              <span>Trusted Giveaway Platform</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight">
              Win Amazing
              <br />
              Prizes Every Week
            </h1>

            <p className="mt-6 text-xl text-blue-100">
              Join thousands of users entering exciting giveaways
              and winning smartphones, laptops, shopping vouchers,
              cash prizes and much more.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">

              <Link
                to="/register"
                className="bg-yellow-400 text-black px-8 py-4 rounded-xl font-semibold hover:bg-yellow-300 transition"
              >
                Join Free
              </Link>

              <Link
                to="/giveaways"
                className="border border-white px-8 py-4 rounded-xl hover:bg-white hover:text-blue-700 transition"
              >
                Browse Giveaways
              </Link>

            </div>

          </div>

          <div className="flex justify-center">

            <div className="bg-white/10 backdrop-blur rounded-3xl p-12 shadow-2xl">

              <Trophy
                size={180}
                className="text-yellow-300 mx-auto"
              />

              <h2 className="text-center text-3xl font-bold mt-6">
                Your Next Win
                Could Be Today
              </h2>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}