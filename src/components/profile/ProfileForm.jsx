import { useState, useEffect } from "react";

export default function ProfileForm({
  profile,
  onSave,
}) {
  const [form, setForm] = useState({
    full_name: "",
    username: "",
    phone: "",
    country: "",
    address: "",
    bio: "",
  });

  useEffect(() => {
    if (profile) {
      setForm({
        full_name: profile.full_name || "",
        username: profile.username || "",
        phone: profile.phone || "",
        country: profile.country || "",
        address: profile.address || "",
        bio: profile.bio || "",
      });
    }
  }, [profile]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="bg-white rounded-2xl shadow p-8">

      <h2 className="text-2xl font-bold mb-6">
        Personal Information
      </h2>

      <div className="grid md:grid-cols-2 gap-5">

        <input
          name="full_name"
          placeholder="Full Name"
          value={form.full_name}
          onChange={handleChange}
          className="border rounded-xl p-3"
        />

        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="border rounded-xl p-3"
        />

        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="border rounded-xl p-3"
        />

        <input
          name="country"
          placeholder="Country"
          value={form.country}
          onChange={handleChange}
          className="border rounded-xl p-3"
        />

      </div>

      <input
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={handleChange}
        className="w-full border rounded-xl p-3 mt-5"
      />

      <textarea
        name="bio"
        rows="4"
        placeholder="About yourself..."
        value={form.bio}
        onChange={handleChange}
        className="w-full border rounded-xl p-3 mt-5"
      />

      <button
        onClick={() => onSave(form)}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
      >
        Save Changes
      </button>

    </div>
  );
}