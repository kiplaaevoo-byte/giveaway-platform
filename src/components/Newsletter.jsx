export default function Newsletter() {
  return (
    <section className="bg-gradient-to-r from-blue-700 to-indigo-700 py-20 text-white">

      <div className="max-w-4xl mx-auto text-center px-6">

        <h2 className="text-4xl font-bold">
          Stay Updated
        </h2>

        <p className="mt-4 text-blue-100">
          Subscribe to receive updates about new giveaways.
        </p>

        <div className="flex flex-col md:flex-row gap-4 mt-10">

          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 rounded-xl px-5 py-4 text-black"
          />

          <button className="bg-yellow-400 text-black px-8 rounded-xl font-semibold hover:bg-yellow-300">
            Subscribe
          </button>

        </div>

      </div>

    </section>
  );
}