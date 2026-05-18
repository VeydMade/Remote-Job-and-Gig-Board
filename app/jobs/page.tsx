"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function JobsPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("jobs") || "[]");

    const openJobs = stored.filter(
      (j: any) => (j.status ?? "open") === "open"
    );

    setJobs(openJobs);
  }, []);

  function getTitle(job: any) {
    return job.title || job.jobTitle || "Untitled role";
  }

  function getSummary(job: any) {
    return (
      job.summary ||
      job.description?.slice(0, 120) ||
      "No summary provided."
    );
  }

  return (
    <div style={{ maxWidth: 1100, margin: "2rem auto" }}>
      <h1>Jobs</h1>

      <div
        style={{
          marginTop: "1.5rem",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1rem",
        }}
      >
        {jobs.map((job) => (
          <button
            key={job.id}
            onClick={() => router.push(`/jobs/${job.id}`)}
            style={{
              textAlign: "left",
              padding: "1rem",
              border: "1px solid var(--border)",
              borderRadius: 8,
              background: "var(--card-bg)",
              cursor: "pointer",
            }}
          >
            <h3>{getTitle(job)}</h3>
            <p style={{ color: "var(--muted)", marginTop: "0.5rem" }}>
              {getSummary(job)}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
