import { useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function TestSupabase() {
  useEffect(() => {
    async function test() {
      const { data, error } = await supabase.auth.getSession();

      console.log("Session:", data);
      console.log("Error:", error);
    }

    test();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-bold">
        Supabase Connected ✅
      </h1>

      <p className="mt-4 text-gray-600">
        Check the browser console.
      </p>
    </div>
  );
}