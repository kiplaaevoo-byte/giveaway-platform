import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">

      <h1 className="text-8xl font-bold">
        404
      </h1>

      <p className="mt-4 text-gray-500">
        Page Not Found
      </p>

      <Link
        to="/"
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        Go Home
      </Link>

    </div>
  );
}