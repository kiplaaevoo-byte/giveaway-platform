import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useAuth from "../hooks/useAuth";

import {
  getGiveaway,
  enterGiveaway,
  getParticipantCount,
} from "../services/giveawayService";

import { getRemainingDays } from "../utils/countdown";

export default function GiveawayDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useAuth();

  const [giveaway, setGiveaway] = useState(null);
  const [participants, setParticipants] = useState(0);

  const [loading, setLoading] = useState(true);
  const [entering, setEntering] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadGiveaway();
  }, [id]);

  async function loadGiveaway() {
    try {
      setLoading(true);

      const giveawayData = await getGiveaway(id);

      setGiveaway(giveawayData);

      const totalParticipants = await getParticipantCount(id);

      setParticipants(totalParticipants);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleEnter() {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      setEntering(true);

      setError("");
      setMessage("");

      const result = await enterGiveaway(
        giveaway.id,
        user.id
      );

      setMessage(
        `🎉 Entry Successful!

Ticket Number:
${result.ticket_number}`
      );

      const totalParticipants =
        await getParticipantCount(giveaway.id);

      setParticipants(totalParticipants);

    } catch (err) {
      setError(err.message);
    } finally {
      setEntering(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <h2 className="text-2xl font-semibold">
          Loading Giveaway...
        </h2>
      </div>
    );
  }

  if (!giveaway) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        Giveaway not found.
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">

      <div className="grid lg:grid-cols-2 gap-10">

        <img
          src={giveaway.image}
          alt={giveaway.title}
          className="rounded-2xl shadow-xl w-full object-cover"
        />

        <div>

          <h1 className="text-4xl font-bold">
            {giveaway.title}
          </h1>

          <p className="text-gray-600 mt-4">
            {giveaway.description}
          </p>

          <div className="mt-8 space-y-3">

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

            <p>
              <strong>Time Remaining:</strong>{" "}
              {getRemainingDays(giveaway.end_date)}
            </p>

            <p>
              <strong>Participants:</strong>{" "}
              {participants}
            </p>

          </div>

          {message && (
            <div className="mt-6 rounded-xl bg-green-100 border border-green-300 p-4 text-green-700 whitespace-pre-line">
              {message}
            </div>
          )}

          {error && (
            <div className="mt-6 rounded-xl bg-red-100 border border-red-300 p-4 text-red-700">
              {error}
            </div>
          )}

          <button
            onClick={handleEnter}
            disabled={entering}
            className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold disabled:opacity-50"
          >
            {entering
              ? "Submitting..."
              : "Enter Giveaway"}
          </button>

        </div>

      </div>

    </section>
  );
}