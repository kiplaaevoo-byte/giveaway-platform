import React from "react";

export default function Profile() {
  return (
    <div className="max-w-xl mx-auto py-10">

      <h1 className="text-4xl font-bold">
        My Profile
      </h1>

      <div className="mt-6 bg-white shadow rounded-xl p-6">

        <p>Name:</p>
        <p>Email:</p>
        <p>Phone:</p>

      </div>

    </div>
  );
}