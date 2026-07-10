import { useEffect, useState } from "react";

export default function GiveawayCountdown({ endDate }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    function updateCountdown() {
      const end = new Date(endDate);
      const now = new Date();

      const diff = end - now;

      if (diff <= 0) {
        setTimeLeft("Ended");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));

      const hours = Math.floor(
        (diff / (1000 * 60 * 60)) % 24
      );

      const minutes = Math.floor(
        (diff / (1000 * 60)) % 60
      );

      const seconds = Math.floor(
        (diff / 1000) % 60
      );

      setTimeLeft(
        `${days}d ${hours}h ${minutes}m ${seconds}s`
      );
    }

    updateCountdown();

    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);

  }, [endDate]);

  return (
    <span className="text-red-600 font-semibold">
      {timeLeft}
    </span>
  );
}