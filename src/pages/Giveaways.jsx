import React from "react";

export default function Giveaways() {
  return (
    <div className="container mx-auto py-10 px-6">
      <h1 className="text-4xl font-bold mb-6">
        Active Giveaways
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="shadow-lg rounded-xl p-5">
          <h2 className="text-xl font-bold">
            iPhone Giveaway
          </h2>

          <p className="mt-2 text-gray-500">
            Win a brand-new smartphone.
          </p>

          <button className="mt-4 bg-blue-600 text-white px-5 py-2 rounded">
            Enter
          </button>
        </div>

      </div>
    </div>
  );
}