import { useEffect, useState } from "react";
import { getGiveaways } from "../services/giveawayService";

export default function useGiveaways() {
  const [giveaways, setGiveaways] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadGiveaways() {
      try {
        const data = await getGiveaways();
        setGiveaways(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadGiveaways();
  }, []);

  return {
    giveaways,
    loading,
    error,
  };
}