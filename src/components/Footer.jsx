export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-10">

      <div className="container mx-auto px-6 py-8">

        <div className="grid md:grid-cols-3 gap-8">

          <div>
            <h2 className="text-xl font-bold mb-3">
              Giveaway Hub
            </h2>

            <p className="text-gray-300">
              A secure platform for hosting and joining legitimate promotional giveaways.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">
              Quick Links
            </h3>

            <ul className="space-y-2">
              <li>Home</li>
              <li>Giveaways</li>
              <li>Winners</li>
              <li>Contact</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">
              Contact
            </h3>

            <p>Email: support@giveawayhub.com</p>

            <p>Phone: +254 700 000000</p>
          </div>

        </div>

        <div className="border-t border-gray-700 mt-8 pt-5 text-center text-gray-400">

          © {new Date().getFullYear()} Giveaway Hub.
          All Rights Reserved.

        </div>

      </div>
    </footer>
  );
}