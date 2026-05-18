"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Profile = {
  id: string;
  type: "employer" | "worker";
  displayName: string;
  location?: string;
  profileImage?: {
    dataUrl: string;
  } | null;
  links?: {
    website?: string;
    linkedin?: string;
    twitter?: string;
  };
};

type Job = {
  id: string;
  jobTitle: string;
  location?: string;
  status?: "open" | "closed";
  postedBy?: string;
};

type QuickGig = {
  id: string;
  title: string;
  price: number;
  status?: "open" | "closed";
  postedBy?: string;
};

function normalizeUrl(url: string) {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `https://${url}`;
}

export default function MyProfilePage() {
  const router = useRouter();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [publicView, setPublicView] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [gigs, setGigs] = useState<QuickGig[]>([]);

  useEffect(() => {
    const storedProfile = localStorage.getItem("profile");
    if (storedProfile) {
      const parsed = JSON.parse(storedProfile);
      setProfile(parsed);

      // Load jobs
      const storedJobs = localStorage.getItem("jobs");
      if (storedJobs) {
        const allJobs: Job[] = JSON.parse(storedJobs);
        setJobs(
          allJobs.filter(
            (job) =>
              job.postedBy === parsed.id &&
              (job.status ?? "open") === "open"
          )
        );
      }

      // Load gigs
      const storedGigs = localStorage.getItem("quickGigs");
      if (storedGigs) {
        const allGigs: QuickGig[] = JSON.parse(storedGigs);
        setGigs(
          allGigs.filter(
            (gig) =>
              gig.postedBy === parsed.id &&
              (gig.status ?? "open") === "open"
          )
        );
      }
    }
  }, []);

  if (!profile) {
    return <p style={{ padding: "2rem" }}>Loading profile…</p>;
  }

  return (
    <div style={{ maxWidth: "900px", margin: "2rem auto" }}>
      {/* VIEW MODE LABEL */}
      <div
        style={{
          textAlign: "center",
          fontSize: "0.85rem",
          color: "var(--muted)",
          marginBottom: "0.35rem",
        }}
      >
        {publicView
          ? "This is your public profile view"
          : "This is your private profile view"}
      </div>

      {/* PROFILE CARD */}
      <div
        style={{
          padding: "1.5rem",
          border: "1px solid var(--border)",
          borderRadius: "10px",
          position: "relative",
        }}
      >
        {/* TOP CONTROLS */}
        <div
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            display: "flex",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              fontSize: "0.85rem",
              color: "var(--muted)",
            }}
          >
            <input
              type="checkbox"
              checked={publicView}
              onChange={() => setPublicView(!publicView)}
            />
            Public View
          </label>

          <button
            onClick={() => router.push("/create-profile")}
            style={{
              background: "transparent",
              border: "1px solid var(--border)",
              color: "var(--text)",
              padding: "0.4rem 0.75rem",
              borderRadius: "6px",
              cursor: "pointer",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--input-bg)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            Edit Profile
          </button>
        </div>

        {/* HEADER */}
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <div
            style={{
              width: "160px",
              aspectRatio: "1 / 1",
              backgroundColor: "var(--input-bg)",
              borderRadius: "8px",
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
              <span style={{ color: "var(--muted)" }}>No image</span>
            )}
          </div>

          <div>
            <h1 style={{ marginTop: 0 }}>{profile.displayName}</h1>

            {profile.location && (
              <p style={{ color: "var(--muted)" }}>{profile.location}</p>
            )}

            {profile.links && (
              <div style={{ marginTop: "0.75rem" }}>
                {profile.links.website && (
                  <div>
                    <a
                      href={normalizeUrl(profile.links.website)}
                      target="_blank"
                    >
                      Website
                    </a>
                  </div>
                )}
                {profile.links.linkedin && (
                  <div>
                    <a
                      href={normalizeUrl(profile.links.linkedin)}
                      target="_blank"
                    >
                      LinkedIn
                    </a>
                  </div>
                )}
                {profile.links.twitter && (
                  <div>
                    <a
                      href={normalizeUrl(profile.links.twitter)}
                      target="_blank"
                    >
                      Twitter / X
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* PUBLIC CONTENT */}
        {publicView && profile.type === "employer" && (
          <>
            {jobs.length > 0 && (
              <>
                <hr style={{ margin: "2rem 0" }} />
                <h2>Open Jobs</h2>
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    style={{
                      border: "1px solid var(--border)",
                      borderRadius: "6px",
                      padding: "0.75rem",
                      marginBottom: "0.75rem",
                    }}
                  >
                    <a href={`/jobs/${job.id}`}>
                      <strong>{job.jobTitle}</strong>
                    </a>
                    {job.location && (
                      <div
                        style={{
                          color: "var(--muted)",
                          fontSize: "0.9rem",
                        }}
                      >
                        {job.location}
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}

            {gigs.length > 0 && (
              <>
                <hr style={{ margin: "2rem 0" }} />
                <h2>Open Gigs</h2>
                {gigs.map((gig) => (
                  <div
                    key={gig.id}
                    style={{
                      border: "1px solid var(--border)",
                      borderRadius: "6px",
                      padding: "0.75rem",
                      marginBottom: "0.75rem",
                    }}
                  >
                    <a href={`/quick-gigs/${gig.id}`}>
                      <strong>{gig.title}</strong>
                    </a>
                    <div
                      style={{
                        color: "var(--muted)",
                        fontSize: "0.9rem",
                      }}
                    >
                      ${gig.price}
                    </div>
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
