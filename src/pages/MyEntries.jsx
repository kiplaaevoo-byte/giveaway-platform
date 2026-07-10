import { useEffect, useMemo, useState } from "react";
import { RotateCw, Ticket } from "lucide-react";

import useAuth from "../hooks/useAuth";

import { getMyEntries } from "../services/entryService";

import EntrySearch from "../components/entries/EntrySearch";
import EntryTable from "../components/entries/EntryTable";
import EntryCard from "../components/entries/EntryCard";

export default function MyEntries() {
  const { user } = useAuth();

  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  async function loadEntries() {
    if (!user) return;

    try {
      setLoading(true);

      const data = await getMyEntries(user.id);

      setEntries(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEntries();
  }, [user]);

  const filteredEntries = useMemo(() => {
    return entries.filter((entry) => {
      const ticket =
        entry.ticket_number?.toLowerCase() || "";

      const title =
        entry.giveaways?.title?.toLowerCase() || "";

      return (
        ticket.includes(search.toLowerCase()) ||
        title.includes(search.toLowerCase())
      );
    });
  }, [entries, search]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            My Giveaway Entries
          </h1>

          <p className="text-gray-500 mt-2">
            View all giveaways you've entered.
          </p>

        </div>

        <button
          onClick={loadEntries}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
        >
          <RotateCw size={18} />

          Refresh

        </button>

      </div>

      {/* Search */}

      <div className="mb-8">

        <EntrySearch
          search={search}
          setSearch={setSearch}
        />

      </div>

      {/* Loading */}

      {loading && (

        <div className="bg-white rounded-2xl shadow p-12 text-center">

          <div className="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4" />

          <p className="text-gray-500">
            Loading your entries...
          </p>

        </div>

      )}

      {/* Empty */}

      {!loading && filteredEntries.length === 0 && (

        <div className="bg-white rounded-2xl shadow p-12 text-center">

          <Ticket
            className="mx-auto text-gray-400"
            size={60}
          />

          <h2 className="text-xl font-bold mt-6">
            No Entries Found
          </h2>

          <p className="text-gray-500 mt-2">
            Enter a giveaway to see your tickets here.
          </p>

        </div>

      )}

      {/* Desktop */}

      {!loading && filteredEntries.length > 0 && (

        <div className="hidden lg:block">

          <EntryTable
            entries={filteredEntries}
          />

        </div>

      )}

      {/* Mobile */}

      {!loading && filteredEntries.length > 0 && (

        <div className="grid lg:hidden gap-5">

          {filteredEntries.map((entry) => (

            <EntryCard
              key={entry.id}
              entry={entry}
            />

          ))}

        </div>

      )}

    </div>
  );
}