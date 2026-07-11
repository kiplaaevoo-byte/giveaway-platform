import { useState, useEffect } from "react";
import {
  X,
  Save,
  Upload,
} from "lucide-react";

import { supabase } from "../../../lib/supabase";

export default function GiveawayForm({
  open,
  onClose,
  onSubmit,
  initialData = null,
  loading = false,
}) {

  const emptyForm = {
    title: "",
    description: "",
    prize: "",
    category: "",
    prize_value: "",
    image_url: "",
    start_date: "",
    end_date: "",
    max_entries: "",
    status: "draft",
  };

  const [form, setForm] = useState(emptyForm);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {

    if (initialData) {

      setForm({
        title: initialData.title || "",
        description: initialData.description || "",
        prize: initialData.prize || "",
        category: initialData.category || "",
        prize_value: initialData.prize_value || "",
        image_url: initialData.image_url || "",
        start_date: initialData.start_date || "",
        end_date: initialData.end_date || "",
        max_entries: initialData.max_entries || "",
        status: initialData.status || "draft",
      });

      setPreview(initialData.image_url || "");

    } else {

      setForm(emptyForm);
      setPreview("");

    }

  }, [initialData]);

  function handleChange(e) {

    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "image_url") {
      setPreview(value);
    }

  }

  async function uploadImage(file) {

    if (!file) return;

    try {

      setUploading(true);

      const extension = file.name.split(".").pop();

      const filename =
        `${Date.now()}.${extension}`;

      const filePath =
        filename;

      const { error } = await supabase.storage
        .from("giveaways")
        .upload(filePath, file);

      if (error) throw error;

      const { data } = supabase.storage
        .from("giveaways")
        .getPublicUrl(filePath);

      setForm((prev) => ({
        ...prev,
        image_url: data.publicUrl,
      }));

      setPreview(data.publicUrl);

    } catch (err) {

      console.error(err);
      alert(err.message);

    } finally {

      setUploading(false);

    }

  }

  async function submit(e) {

    e.preventDefault();

    if (!form.title.trim()) {
      return alert("Giveaway title is required.");
    }

    if (!form.prize.trim()) {
      return alert("Prize is required.");
    }

    if (!form.category.trim()) {
      return alert("Category is required.");
    }

    if (!form.image_url) {
      return alert("Please upload an image.");
    }

    await onSubmit(form);

  }

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-5">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[95vh] overflow-y-auto">

        {/* Header */}

        <div className="flex justify-between items-center border-b p-6">

          <div>

            <h2 className="text-3xl font-bold">

              {initialData ? "Edit Giveaway" : "Create Giveaway"}

            </h2>

            <p className="text-slate-500 mt-1">

              Fill in all giveaway information.

            </p>

          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100"
          >
            <X />
          </button>

        </div>

        <form
  onSubmit={submit}
  className="p-8 space-y-8"
>

  {/* BASIC INFORMATION */}

  <div className="grid lg:grid-cols-2 gap-6">

    <div>

      <label className="block font-semibold mb-2">
        Giveaway Title
      </label>

      <input
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500"
        placeholder="iPhone 16 Pro Giveaway"
      />

    </div>

    <div>

      <label className="block font-semibold mb-2">
        Category
      </label>

      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500"
      >

        <option value="">Choose Category</option>

        <option value="Electronics">
          Electronics
        </option>

        <option value="Cash">
          Cash
        </option>

        <option value="Shopping">
          Shopping
        </option>

        <option value="Travel">
          Travel
        </option>

        <option value="Fashion">
          Fashion
        </option>

        <option value="Food">
          Food
        </option>

        <option value="Other">
          Other
        </option>

      </select>

    </div>

  </div>

  {/* DESCRIPTION */}

  <div>

    <label className="block font-semibold mb-2">
      Description
    </label>

    <textarea
      rows={5}
      name="description"
      value={form.description}
      onChange={handleChange}
      className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500"
      placeholder="Describe this giveaway..."
    />

  </div>

  {/* PRIZE */}

  <div className="grid lg:grid-cols-2 gap-6">

    <div>

      <label className="block font-semibold mb-2">
        Prize
      </label>

      <input
        name="prize"
        value={form.prize}
        onChange={handleChange}
        className="w-full border rounded-xl p-3"
        placeholder="iPhone 16 Pro"
      />

    </div>

    <div>

      <label className="block font-semibold mb-2">
        Prize Value (KES)
      </label>

      <input
        type="number"
        name="prize_value"
        value={form.prize_value}
        onChange={handleChange}
        className="w-full border rounded-xl p-3"
        placeholder="180000"
      />

    </div>

  </div>

  {/* IMAGE */}

  <div>

    <label className="block font-semibold mb-3">
      Giveaway Image
    </label>

    <label className="border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition">

      <Upload
        size={40}
        className="text-blue-600 mb-3"
      />

      <span className="font-semibold">

        {uploading
          ? "Uploading..."
          : "Choose Image"}

      </span>

      <small className="text-slate-500 mt-2">

        PNG, JPG or WEBP

      </small>

      <input
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {

          const file =
            e.target.files[0];

          uploadImage(file);

        }}
      />

    </label>

  </div>

  {/* PREVIEW */}

  {preview && (

    <div>

      <label className="block font-semibold mb-3">

        Preview

      </label>

      <img
        src={preview}
        alt="Preview"
        className="rounded-2xl w-full h-80 object-cover border"
      />

    </div>

  )}

  {/* DATES */}

  <div className="grid lg:grid-cols-3 gap-6">

    <div>

      <label className="block font-semibold mb-2">
        Start Date
      </label>

      <input
        type="date"
        name="start_date"
        value={form.start_date}
        onChange={handleChange}
        className="w-full border rounded-xl p-3"
      />

    </div>

    <div>

      <label className="block font-semibold mb-2">
        End Date
      </label>

      <input
        type="date"
        name="end_date"
        value={form.end_date}
        onChange={handleChange}
        className="w-full border rounded-xl p-3"
      />

    </div>

    <div>

      <label className="block font-semibold mb-2">
        Maximum Entries
      </label>

      <input
        type="number"
        name="max_entries"
        value={form.max_entries}
        onChange={handleChange}
        className="w-full border rounded-xl p-3"
      />

    </div>

  </div>

  {/* STATUS */}

  <div>

    <label className="block font-semibold mb-2">
      Status
    </label>

    <select
      name="status"
      value={form.status}
      onChange={handleChange}
      className="w-full border rounded-xl p-3"
    >

      <option value="draft">
        Draft
      </option>

      <option value="active">
        Active
      </option>

      <option value="ended">
        Ended
      </option>

    </select>

  </div>

  {/* FOOTER */}

  <div className="border-t pt-6 flex justify-end gap-4">

    <button
      type="button"
      onClick={onClose}
      className="px-6 py-3 rounded-xl border hover:bg-slate-100"
    >
      Cancel
    </button>

    <button
      type="submit"
      disabled={loading || uploading}
      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl flex items-center gap-2 disabled:opacity-50"
    >

      <Save size={18} />

      {uploading
        ? "Uploading..."
        : loading
        ? "Saving..."
        : initialData
        ? "Update Giveaway"
        : "Create Giveaway"}

    </button>

  </div>

</form>