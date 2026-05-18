"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function JobsAndGigsPage() {
  const router = useRouter();

  const [profile, setProfile] = useState<any>(null);
  const [view, setView] = useState<"jobs" | "gigs">("jobs");
  const [jobs, setJobs] = useState<any[]>([]);
  const [gigs, setGigs] = useState<any[]>([]);

  useEffect(() => {
    const storedProfile = localStorage.getItem("profile");
    if (!storedProfile) return;

    const parsedProfile = JSON.parse(storedProfile);
    setProfile(parsedProfile);

    loadJobs(parsedProfile.id);
    loadGigs(parsedProfile.id);
  }, []);

  function loadJobs(profileId: string) {
    const stored = localStorage.getItem("jobs");
    if (!stored) return;

    const all = JSON.parse(stored);
    setJobs(all.filter((j: any) => j.postedBy === profileId));
  }

  function loadGigs(profileId: string) {
    const stored = localStorage.getItem("quickGigs");
    if (!stored) return;

    const all = JSON.parse(stored);
    setGigs(all.filter((g: any) => g.postedBy === profileId));
  }

  function toggleStatus(type: "job" | "gig", id: string) {
    const key = type === "job" ? "jobs" : "quickGigs";
    const stored = localStorage.getItem(key);
    if (!stored) return;

    const items = JSON.parse(stored).map((item: any) => {
      if (item.id !== id) return item;
      return {
        ...item,
        status: (item.status ?? "open") === "open" ? "closed" : "open",
      };
    });

    localStorage.setItem(key, JSON.stringify(items));

    if (profile) {
      type === "job" ? loadJobs(profile.id) : loadGigs(profile.id);
    }
  }

  if (!profile) return <p style={{ padding: "2rem" }}>Loading…</p>;

  const navButton = (active: boolean): React.CSSProperties => ({
    padding: "0.4rem 0.75rem",
    borderRadius: "6px",
    border: "1px solid var(--border)",
    backgroundColor: active ? "var(--input-bg)" : "transparent",
    cursor: "pointer",
    fontWeight: active ? 600 : 400,
  });

  const cardStyle = (closed: boolean): React.CSSProperties => ({
    border: "1px solid var(--border)",
    borderRadius: "10px",
    padding: "1rem",
    opacity: closed ? 0.6 : 1,
  });

  return (
    <div style={{ maxWidth: "1200px", margin: "2rem auto", padding: "0 1rem" }}>
      <h1>Jobs & Gigs</h1>

      <div style={{ display: "flex", gap: "0.75rem", margin: "1rem 0 1.5rem" }}>
        <button style={navButton(view === "jobs")} onClick={() => setView("jobs")}>
          Jobs
        </button>
        <button style={navButton(view === "gigs")} onClick={() => setView("gigs")}>
          Gigs
        </button>
      </div>

      {view === "jobs" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {jobs.map((job) => {
            const closed = (job.status ?? "open") === "closed";

            return (
              <div key={job.id} style={cardStyle(closed)}>
                <h3>{job.jobTitle}</h3>
                <p style={{ color: "var(--muted)" }}>{job.summary}</p>

                <div style={{ marginTop: "0.75rem", fontSize: "0.85rem" }}>
                  Status: {closed ? "Closed" : "Open"}
                </div>

                <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem" }}>
                  <button onClick={() => router.push(`/jobs/${job.id}`)}>
                    View
                  </button>
                  <button onClick={() => toggleStatus("job", job.id)}>
                    {closed ? "Reopen" : "Close"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {view === "gigs" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {gigs.map((gig) => {
            const closed = (gig.status ?? "open") === "closed";

            return (
              <div key={gig.id} style={cardStyle(closed)}>
                <h3>{gig.title}</h3>
                <p style={{ color: "var(--muted)" }}>{gig.summary}</p>
                <div style={{ marginTop: "0.5rem", fontWeight: 600 }}>
                  ${gig.price}
                </div>

                <div style={{ marginTop: "0.5rem", fontSize: "0.85rem" }}>
                  Status: {closed ? "Closed" : "Open"}
                </div>

                <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem" }}>
                  <button onClick={() => router.push(`/quick-gigs/${gig.id}`)}>
                    View
                  </button>
                  <button onClick={() => toggleStatus("gig", gig.id)}>
                    {closed ? "Reopen" : "Close"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
