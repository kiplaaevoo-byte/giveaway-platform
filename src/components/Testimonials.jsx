const reviews = [
  {
    name: "Sarah W.",
    text: "The platform is easy to use and I won a shopping voucher!",
  },
  {
    name: "David K.",
    text: "Transparent giveaways and a great user experience.",
  },
  {
    name: "Mary N.",
    text: "Highly recommend. The winner announcements are clear and timely.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-blue-700 text-white">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center">
          What Our Community Says
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mt-12">

          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white/10 rounded-2xl p-6 backdrop-blur"
            >
              <p>"{review.text}"</p>

              <h3 className="mt-5 font-bold">
                {review.name}
              </h3>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}