import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function ChangePassword() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function changePassword() {
    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) throw error;

      alert("Password updated successfully.");

      setPassword("");

    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="font-bold text-xl mb-5">
        Change Password
      </h2>

      <input
        type="password"
        placeholder="New password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
        className="w-full border rounded-xl p-3"
      />

      <button
        onClick={changePassword}
        disabled={loading}
        className="mt-5 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl disabled:opacity-50"
      >
        {loading
          ? "Updating..."
          : "Update Password"}
      </button>

    </div>
  );
}