const faqs = [
  {
    q: "Is joining free?",
    a: "Yes. Entry is free unless a specific promotion states otherwise.",
  },
  {
    q: "How are winners selected?",
    a: "Winners are selected according to the published rules for each giveaway.",
  },
  {
    q: "How will I know if I win?",
    a: "We'll notify winners through their registered contact details and publish results on the platform where applicable.",
  },
];

export default function FAQ() {
  return (
    <section className="py-20 bg-gray-50">

      <div className="max-w-4xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6 mt-12">

          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow p-6"
            >
              <h3 className="font-bold text-lg">
                {faq.q}
              </h3>

              <p className="mt-3 text-gray-600">
                {faq.a}
              </p>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}