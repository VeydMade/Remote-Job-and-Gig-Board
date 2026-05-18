"use client";

import { useEffect, useState } from "react";

type Profile = {
  id: string;
  type: "employer" | "worker";
  displayName: string;
  location?: string;
  profileImage?: {
    dataUrl: string;
  } | null;
};

export default function WorkersPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("profiles");
    if (!stored) return;

    const allProfiles: Profile[] = JSON.parse(stored);
    setProfiles(allProfiles.filter((p) => p.type === "worker"));
  }, []);

  const filtered = profiles.filter((p) =>
    p.displayName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ maxWidth: "1100px", margin: "2rem auto", padding: "1rem" }}>
      <h1>Workers</h1>

      <input
        placeholder="Search workers…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "1.5rem", width: "100%" }}
      />

      {filtered.length === 0 && <p>No workers found.</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.5rem",
        }}
      >
        {filtered.map((profile) => (
          <a
            key={profile.id}
            href={`/workers/${profile.id}`}
            style={{
              border: "1px solid var(--border)",
              borderRadius: "8px",
              padding: "1rem",
              textAlign: "center",
            }}
          >
            {/* IMAGE */}
            <div
              style={{
                width: "100%",
                aspectRatio: "1 / 1",
                marginBottom: "0.75rem",
                backgroundColor: "var(--input-bg)",
                borderRadius: "6px",
                overflow: "hidden",
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

            <strong>{profile.displayName}</strong>
            {profile.location && (
              <div style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
                {profile.location}
              </div>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}
