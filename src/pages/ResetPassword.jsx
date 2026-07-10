import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setMessage("");

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Password updated successfully.");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold mb-6">
          Reset Password
        </h1>

        {message && (
          <div className="mb-4 p-3 bg-green-100 rounded">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-100 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <input
            type="password"
            placeholder="New Password"
            className="border rounded-lg w-full p-3 mb-4"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="border rounded-lg w-full p-3 mb-5"
            value={confirm}
            onChange={(e) =>
              setConfirm(e.target.value)
            }
          />

          <button
            className="w-full bg-green-600 text-white py-3 rounded-lg"
          >
            Update Password
          </button>

        </form>

      </div>

    </div>
  );
}