"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Job = {
  id: string;
  title?: string;
  jobTitle?: string;
  summary?: string;
  description?: string;
  status?: "open" | "closed";
};

type QuickGig = {
  id: string;
  title?: string;
  summary?: string;
  description?: string;
  status?: "open" | "closed";
};

export default function HomePage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [gigs, setGigs] = useState<QuickGig[]>([]);

  useEffect(() => {
    const storedJobs = localStorage.getItem("jobs");
    const storedGigs = localStorage.getItem("quickGigs");

    if (storedJobs) {
      const parsed = JSON.parse(storedJobs);

      const openJobs = parsed
        .filter((j: Job) => (j.status ?? "open") === "open")
        .slice(-3)
        .reverse();

      setJobs(openJobs);
    }

    if (storedGigs) {
      const parsed = JSON.parse(storedGigs);

      const openGigs = parsed
        .filter((g: QuickGig) => (g.status ?? "open") === "open")
        .slice(-3)
        .reverse();

      setGigs(openGigs);
    }
  }, []);

  function getJobTitle(job: Job) {
    return job.title || job.jobTitle || "Untitled Job";
  }

  function getJobSummary(job: Job) {
    return (
      job.summary ||
      job.description ||
      "No description provided."
    );
  }

  function getGigTitle(gig: QuickGig) {
    return gig.title || "Untitled Gig";
  }

  function getGigSummary(gig: QuickGig) {
    return (
      gig.summary ||
      gig.description ||
      "No description provided."
    );
  }

  return (
    <div style={{ padding: "3rem 2rem" }}>
      {/* TRUST / HERO */}
      <section
        style={{
          maxWidth: "900px",
          margin: "0 auto 3.5rem",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "2.4rem", marginBottom: "1rem" }}>
          A trusted job-first board
        </h1>

        <p
          style={{
            fontSize: "1.05rem",
            lineHeight: 1.55,
            opacity: 0.85,
          }}
        >
          We believe you shouldn’t have to pay just to try to find work.
          Whether a job is remote or on-site, full-time or just a quick gig,
          access should come first. There are plenty of platforms that charge
          just to get noticed — this isn’t one of them.
        </p>
      </section>

      {/* LATEST JOB LISTINGS */}
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto 3.5rem",
        }}
      >
        <h2
          style={{
            fontSize: "1.65rem",
            marginBottom: "1.5rem",
            textAlign: "center",
          }}
        >
          Latest Job Listings
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "1.5rem",
            marginBottom: "1rem",
          }}
        >
          {jobs.length === 0 && (
            <p style={{ gridColumn: "1 / -1" }}>
              No job listings yet.
            </p>
          )}

          {jobs.map((job) => (
            <div
              key={job.id}
              onClick={() => router.push(`/jobs/${job.id}`)}
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "1.4rem",
                cursor: "pointer",
              }}
            >
              <h3 style={{ marginBottom: "0.4rem" }}>
                {getJobTitle(job)}
              </h3>

              <p style={{ lineHeight: 1.45 }}>
                {getJobSummary(job)}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={() => router.push("/jobs")}
          style={{
            padding: "0.75rem 2rem",
            fontSize: "0.95rem",
            borderRadius: "999px",
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
        >
          View all jobs →
        </button>
      </section>

      {/* LATEST GIG LISTINGS */}
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            fontSize: "1.65rem",
            marginBottom: "1.5rem",
            textAlign: "center",
          }}
        >
          Latest Gig Listings
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "1.5rem",
            marginBottom: "1rem",
          }}
        >
          {gigs.length === 0 && (
            <p style={{ gridColumn: "1 / -1" }}>
              No gig listings yet.
            </p>
          )}

          {gigs.map((gig) => (
            <div
              key={gig.id}
              onClick={() =>
                router.push(`/quick-gigs/${gig.id}`)
              }
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "1.4rem",
                cursor: "pointer",
              }}
            >
              <h3 style={{ marginBottom: "0.4rem" }}>
                {getGigTitle(gig)}
              </h3>

              <p style={{ lineHeight: 1.45 }}>
                {getGigSummary(gig)}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={() => router.push("/quick-gigs")}
          style={{
            padding: "0.75rem 2rem",
            fontSize: "0.95rem",
            borderRadius: "999px",
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
        >
          View all gigs →
        </button>
      </section>
    </div>
  );
}
