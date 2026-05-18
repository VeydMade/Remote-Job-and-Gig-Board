"use client";

import { useEffect, useState } from "react";

type Profile = {
  id: string;
  type: "employer" | "worker";
  displayName: string;
  location: string;
  profileImage: {
    fileName: string;
    dataUrl: string;
  } | null;
  links: {
    website: string;
    linkedin: string;
    twitter: string;
  };
};

export default function CreateProfilePage() {
  const [profile, setProfile] = useState<Profile>({
    id: "",
    type: "worker",
    displayName: "",
    location: "",
    profileImage: null,
    links: {
      website: "",
      linkedin: "",
      twitter: "",
    },
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("profile");
    if (!stored) return;

    const parsed = JSON.parse(stored);

    setProfile({
      id: parsed.id || crypto.randomUUID(),
      type: parsed.type || "worker",
      displayName: parsed.displayName || "",
      location: parsed.location || "",
      profileImage: parsed.profileImage || null,
      links: {
        website: parsed.links?.website || "",
        linkedin: parsed.links?.linkedin || "",
        twitter: parsed.links?.twitter || "",
      },
    });
  }, []);

  function handleImageUpload(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      setProfile((prev) => ({
        ...prev,
        profileImage: {
          fileName: file.name,
          dataUrl: reader.result as string,
        },
      }));
    };
    reader.readAsDataURL(file);
  }

  function saveProfile() {
    localStorage.setItem("profile", JSON.stringify(profile));

    const storedProfiles = localStorage.getItem("profiles");
    const profiles = storedProfiles ? JSON.parse(storedProfiles) : [];

    const index = profiles.findIndex((p: any) => p.id === profile.id);
    if (index >= 0) profiles[index] = profile;
    else profiles.push(profile);

    localStorage.setItem("profiles", JSON.stringify(profiles));
    setSaved(true);
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.6rem",
    marginBottom: "1rem",
    backgroundColor: "var(--input-bg)",
    border: "1px solid var(--border)",
    borderRadius: "6px",
    fontSize: "1rem",
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "2rem auto",
        padding: "2rem",
        border: "1px solid var(--border)",
        borderRadius: "8px",
      }}
    >
      <h1>Edit Profile</h1>

      {saved && <p style={{ color: "green" }}>Profile saved.</p>}

      {/* PROFILE TYPE */}
      <label>Profile Type</label>
      <select
        style={inputStyle}
        value={profile.type}
        onChange={(e) =>
          setProfile({ ...profile, type: e.target.value as any })
        }
      >
        <option value="worker">Worker</option>
        <option value="employer">Employer</option>
      </select>

      {/* PROFILE IMAGE SECTION */}
      <div
        style={{
          marginBottom: "1.5rem",
          padding: "1rem",
          border: "1px solid var(--border)",
          borderRadius: "8px",
        }}
      >
        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          Profile Picture
        </label>

        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "8px",
              backgroundColor: "var(--input-bg)",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.8rem",
              color: "var(--muted)",
            }}
          >
            {profile.profileImage ? (
              <img
                src={profile.profileImage.dataUrl}
                alt="Profile preview"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              "No image"
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImageUpload(file);
            }}
          />
        </div>
      </div>

      {/* BASIC INFO */}
      <label>Display Name</label>
      <input
        style={inputStyle}
        value={profile.displayName}
        onChange={(e) =>
          setProfile({ ...profile, displayName: e.target.value })
        }
      />

      <label>Location</label>
      <input
        style={inputStyle}
        value={profile.location}
        onChange={(e) =>
          setProfile({ ...profile, location: e.target.value })
        }
      />

      {/* LINKS */}
      <label>Website</label>
      <input
        style={inputStyle}
        value={profile.links.website}
        onChange={(e) =>
          setProfile({
            ...profile,
            links: { ...profile.links, website: e.target.value },
          })
        }
      />

      <label>LinkedIn</label>
      <input
        style={inputStyle}
        value={profile.links.linkedin}
        onChange={(e) =>
          setProfile({
            ...profile,
            links: { ...profile.links, linkedin: e.target.value },
          })
        }
      />

      <label>Twitter / X</label>
      <input
        style={inputStyle}
        value={profile.links.twitter}
        onChange={(e) =>
          setProfile({
            ...profile,
            links: { ...profile.links, twitter: e.target.value },
          })
        }
      />

      <button onClick={saveProfile}>Save Profile</button>
    </div>
  );
}
