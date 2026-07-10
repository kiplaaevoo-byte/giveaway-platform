import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function AvatarUpload({
  user,
  avatarUrl,
  onUploaded,
}) {
  const [uploading, setUploading] = useState(false);

  async function uploadAvatar(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);

      const extension = file.name.split(".").pop();

      const fileName = `${user.id}.${extension}`;

      const filePath = `avatars/${fileName}`;

      const { error } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, {
          upsert: true,
        });

      if (error) throw error;

      const { data } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      onUploaded(data.publicUrl);

    } catch (err) {
      alert(err.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="font-bold text-xl mb-5">
        Profile Photo
      </h2>

      <img
        src={
          avatarUrl ||
          `https://ui-avatars.com/api/?name=User`
        }
        alt=""
        className="w-32 h-32 rounded-full object-cover border mx-auto"
      />

      <input
        type="file"
        accept="image/*"
        onChange={uploadAvatar}
        className="mt-6 w-full"
      />

      {uploading && (
        <p className="mt-3 text-blue-600">
          Uploading...
        </p>
      )}

    </div>
  );
}