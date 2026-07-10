import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function checkRecoverySession() {
      try {
        // Wait briefly for Supabase to process the recovery link
        await new Promise((resolve) => setTimeout(resolve, 500));

        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          setError(
            "This password reset link is invalid or has expired. Please request a new password reset email."
          );
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setCheckingSession(false);
      }
    }

    checkRecoverySession();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!password || !confirm) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) throw error;

      setMessage(
        "Password updated successfully. Redirecting to login..."
      );

      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (checkingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="bg-white shadow-xl rounded-2xl p-8 text-center">
          <div className="text-xl font-semibold">
            Verifying reset link...
          </div>

          <p className="text-gray-500 mt-2">
            Please wait...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100 px-4">

      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-2">
          Reset Password
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Create a new password for your account.
        </p>

        {message && (
          <div className="mb-5 rounded-lg border border-green-300 bg-green-100 text-green-700 p-3">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-5 rounded-lg border border-red-300 bg-red-100 text-red-700 p-3">
            {error}
          </div>
        )}

        {!error && (
          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block mb-2 font-medium">
                New Password
              </label>

              <input
                type="password"
                placeholder="Enter new password"
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Confirm Password
              </label>

              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-60"
            >
              {loading ? "Updating Password..." : "Update Password"}
            </button>

          </form>
        )}

      </div>

    </div>
  );
}