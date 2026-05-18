"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Profile = {
  id: string;
  type: "worker" | "employer";
  displayName: string;
  location?: string;
  profileImage?: {
    dataUrl: string;
  } | null;
  links?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
};

export default function WorkerProfilePage() {
  const params = useParams();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("profiles");
    if (!stored) return;

    const profiles: Profile[] = JSON.parse(stored);
    const found = profiles.find(
      (p) => p.id === params.id && p.type === "worker"
    );

    setProfile(found || null);
  }, [params.id]);

  if (!profile) {
    return (
      <div style={{ padding: "2rem" }}>
        <p>This worker profile could not be found.</p>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "2rem auto",
        padding: "1.5rem",
        border: "1px solid var(--border)",
        borderRadius: "10px",
      }}
    >
      {/* HEADER */}
      <div style={{ display: "flex", gap: "1.5rem" }}>
        {/* IMAGE */}
        <div
          style={{
            width: "160px",
            aspectRatio: "1 / 1",
            backgroundColor: "var(--input-bg)",
            borderRadius: "8px",
            overflow: "hidden",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {profile.profileImage ? (
            <img
              src={profile.profileImage.dataUrl}
              alt={profile.displayName}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <span style={{ color: "var(--muted)" }}>No photo</span>
          )}
        </div>

        {/* INFO */}
        <div>
          <h1 style={{ marginTop: 0 }}>{profile.displayName}</h1>

          {profile.location && (
            <p style={{ color: "var(--muted)" }}>{profile.location}</p>
          )}

          {/* LINKS */}
          {profile.links && (
            <div style={{ marginTop: "0.75rem" }}>
              {profile.links.website && (
                <div>
                  <a href={profile.links.website} target="_blank">
                    Website
                  </a>
                </div>
              )}
              {profile.links.linkedin && (
                <div>
                  <a href={profile.links.linkedin} target="_blank">
                    LinkedIn
                  </a>
                </div>
              )}
              {profile.links.twitter && (
                <div>
                  <a href={profile.links.twitter} target="_blank">
                    Twitter / X
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <hr style={{ margin: "2rem 0" }} />

      {/* PLACEHOLDERS FOR FUTURE */}
      <p style={{ color: "var(--muted)" }}>
        Resume, skills, work history, and reviews will appear here.
      </p>
    </div>
  );
}
