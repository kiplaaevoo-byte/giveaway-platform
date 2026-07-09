import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import useAuth from "../hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    if (!form.email || !form.password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });

      if (error) throw error;

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-2">
            Sign in to your account.
          </p>
        </div>

        {error && (
          <div className="mb-5 bg-red-100 border border-red-300 text-red-700 rounded-lg p-3">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="********"
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-60"
          >
            {loading ? "Signing In..." : "Login"}
          </button>

        </form>

        <div className="mt-6 text-center space-y-3">

          <Link
            to="/register"
            className="text-blue-600 hover:underline block"
          >
            Create an Account
          </Link>

          <Link
            to="/forgot-password"
            className="text-gray-500 hover:text-blue-600"
          >
            Forgot Password?
          </Link>

        </div>

      </div>
    </div>
  );
}