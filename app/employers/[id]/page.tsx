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

export default function EmployerProfilePage() {
  const params = useParams();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [gigs, setGigs] = useState<QuickGig[]>([]);

  useEffect(() => {
    const storedProfiles = localStorage.getItem("profiles");
    if (storedProfiles) {
      const profiles: Profile[] = JSON.parse(storedProfiles);
      const found = profiles.find(
        (p) => p.id === params.id && p.type === "employer"
      );
      setProfile(found || null);
    }

    const storedJobs = localStorage.getItem("jobs");
    if (storedJobs) {
      const allJobs: Job[] = JSON.parse(storedJobs);
      setJobs(
        allJobs.filter(
          (job) =>
            job.postedBy === params.id &&
            (job.status ?? "open") === "open"
        )
      );
    }

    const storedGigs = localStorage.getItem("quickGigs");
    if (storedGigs) {
      const allGigs: QuickGig[] = JSON.parse(storedGigs);
      setGigs(
        allGigs.filter(
          (gig) =>
            gig.postedBy === params.id &&
            (gig.status ?? "open") === "open"
        )
      );
    }
  }, [params.id]);

  if (!profile) {
    return (
      <div style={{ padding: "2rem" }}>
        <p>This employer profile could not be found.</p>
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
            <span style={{ color: "var(--muted)" }}>No logo</span>
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

      {/* OPEN JOBS */}
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
                <div style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
                  {job.location}
                </div>
              )}
            </div>
          ))}
        </>
      )}

      {/* OPEN QUICK GIGS */}
      {gigs.length > 0 && (
        <>
          <hr style={{ margin: "2rem 0" }} />
          <h2>Open Quick Gigs</h2>

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
              <div style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
                ${gig.price}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
