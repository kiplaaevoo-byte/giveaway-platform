import React from "react";

export default function AdminDashboard() {
  return (
    <div className="container mx-auto py-10 px-6">

      <h1 className="text-4xl font-bold">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-4 gap-6 mt-8">

        <div className="bg-blue-600 text-white p-6 rounded-xl">
          Users
        </div>

        <div className="bg-green-600 text-white p-6 rounded-xl">
          Giveaways
        </div>

        <div className="bg-purple-600 text-white p-6 rounded-xl">
          Winners
        </div>

        <div className="bg-red-600 text-white p-6 rounded-xl">
          Reports
        </div>

      </div>

    </div>
  );
}