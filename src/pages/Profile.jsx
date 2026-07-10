import { useEffect, useState } from "react";

import useAuth from "../hooks/useAuth";

import {
  getProfile,
  updateProfile,
} from "../services/profileService";

import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileStats from "../components/profile/ProfileStats";
import ProfileForm from "../components/profile/ProfileForm";
import AvatarUpload from "../components/profile/AvatarUpload";
import ChangePassword from "../components/profile/ChangePassword";

export default function Profile() {
  const { user } = useAuth();

  const [profile, setProfile] = useState(null);

  const [stats] = useState({
    entries: 0,
    wins: 0,
    active: 0,
    rate: 0,
  });

  useEffect(() => {
    async function loadProfile() {
      if (!user) return;

      try {
        const data = await getProfile(user.id);

        setProfile(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadProfile();
  }, [user]);

  async function saveProfile(values) {
    try {
      await updateProfile(user.id, values);

      setProfile({
        ...profile,
        ...values,
      });

      alert("Profile updated successfully.");

    } catch (err) {
      alert(err.message);
    }
  }

  async function avatarUploaded(url) {
    await saveProfile({
      avatar_url: url,
    });
  }

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">

      <ProfileHeader
        user={user}
        profile={profile}
      />

      <div className="mt-8">

        <ProfileStats
          stats={stats}
        />

      </div>

      <div className="grid lg:grid-cols-3 gap-8 mt-8">

        <div className="space-y-8">

          <AvatarUpload
            user={user}
            avatarUrl={profile?.avatar_url}
            onUploaded={avatarUploaded}
          />

          <ChangePassword />

        </div>

        <div className="lg:col-span-2">

          <ProfileForm
            profile={profile}
            onSave={saveProfile}
          />

        </div>

      </div>

    </div>
  );
}