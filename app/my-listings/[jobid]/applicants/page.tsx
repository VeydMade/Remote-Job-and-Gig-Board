"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const STATUS_LABELS: Record<string, string> = {
  new: "Submitted",
  viewed: "Under review",
  interviewing: "Interviewing",
  not_selected: "Not selected",
  accepted: "Accepted",
};

const INTERNAL_STATUSES = [
  "new",
  "viewed",
  "interviewing",
  "not_selected",
  "accepted",
];

export default function ApplicantsPage({
  params,
}: {
  params: { jobId: string };
}) {
  const router = useRouter();
  const { jobId } = params;

  const [profile, setProfile] = useState<any>(null);
  const [job, setJob] = useState<any>(null);
  const [applications, setApplications] = useState<any[]>([]);

  useEffect(() => {
    const storedProfile = localStorage.getItem("profile");
    if (!storedProfile) {
      router.push("/create-profile");
      return;
    }

    const parsedProfile = JSON.parse(storedProfile);
    if (parsedProfile.type !== "employer") {
      router.push("/");
      return;
    }

    setProfile(parsedProfile);

    const jobs = JSON.parse(localStorage.getItem("jobs") || "[]");
    const foundJob = jobs.find(
      (j: any) => j.id === jobId && j.ownerId === parsedProfile.id
    );

    if (!foundJob) {
      router.push("/my-listings");
      return;
    }

    setJob(foundJob);

    const key = `applications:${jobId}`;
    const storedApps = JSON.parse(localStorage.getItem(key) || "[]");
    setApplications(storedApps);
  }, [jobId, router]);

  function updateStatus(appId: string, status: string) {
    const updated = applications.map((app) =>
      app.id === appId ? { ...app, status } : app
    );

    setApplications(updated);
    localStorage.setItem(
      `applications:${jobId}`,
      JSON.stringify(updated)
    );
  }

  if (!job) return null;

  return (
    <div style={{ maxWidth: 900, margin: "2rem auto" }}>
      <h1>Applicants — {job.title}</h1>

      {applications.length === 0 && (
        <p style={{ marginTop: "1rem", color: "var(--muted)" }}>
          No applications yet.
        </p>
      )}

      {applications.map((app) => (
        <div
          key={app.id}
          style={{
            marginTop: "1.5rem",
            padding: "1rem",
            border: "1px solid var(--border)",
            borderRadius: 8,
            background: "var(--card-bg)",
          }}
        >
          <strong>Status:</strong>{" "}
          {STATUS_LABELS[app.status]}

          <div style={{ marginTop: "0.75rem" }}>
            <label>
              Internal status:
              <select
                value={app.status}
                onChange={(e) =>
                  updateStatus(app.id, e.target.value)
                }
                style={{
                  marginLeft: "0.5rem",
                  background: "var(--input-bg)",
                  color: "var(--text)",
                }}
              >
                {INTERNAL_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {STATUS_LABELS[s]}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div style={{ marginTop: "1rem" }}>
            <strong>Resume</strong>
            <pre
              style={{
                marginTop: "0.5rem",
                whiteSpace: "pre-wrap",
                background: "var(--input-bg)",
                padding: "0.75rem",
                borderRadius: 6,
                maxHeight: 300,
                overflow: "auto",
              }}
            >
              {app.resumeText}
            </pre>
          </div>

          {app.coverNote && (
            <div style={{ marginTop: "1rem" }}>
              <strong>Note</strong>
              <p style={{ marginTop: "0.5rem" }}>
                {app.coverNote}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
