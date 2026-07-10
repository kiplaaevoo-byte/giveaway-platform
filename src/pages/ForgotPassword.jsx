import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      setMessage(
        "A password reset link has been sent to your email. Please check your inbox (and spam folder if necessary)."
      );

      setEmail("");
    } catch (err) {
      setError(err.message || "Unable to send password reset email.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold">
            Forgot Password
          </h1>

          <p className="text-gray-500 mt-2">
            Enter your email address and we'll send you a password reset link.
          </p>

        </div>

        {message && (
          <div className="mb-5 rounded-lg border border-green-300 bg-green-100 text-green-700 p-4">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-5 rounded-lg border border-red-300 bg-red-100 text-red-700 p-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>

            <label className="block mb-2 font-medium">
              Email Address
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoComplete="email"
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-60"
          >
            {loading ? "Sending Reset Link..." : "Send Reset Link"}
          </button>

        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Remember your password?
          <a
            href="/login"
            className="ml-1 text-blue-600 hover:underline font-medium"
          >
            Sign In
          </a>
        </div>

      </div>

    </div>
  );
}