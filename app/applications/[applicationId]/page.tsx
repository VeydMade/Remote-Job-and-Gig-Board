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

export default function ApplicationDetailPage({
  params,
}: {
  params: { applicationId: string };
}) {
  const router = useRouter();
  const { applicationId } = params;

  const [profile, setProfile] = useState<any>(null);
  const [job, setJob] = useState<any>(null);
  const [application, setApplication] = useState<any>(null);
  const [jobId, setJobId] = useState<string | null>(null);

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

    for (const j of jobs) {
      if (
        j.employerId !== parsedProfile.id &&
        j.postedBy !== parsedProfile.id
      ) {
        continue;
      }

      const key = `applications:${j.id}`;
      const apps = JSON.parse(localStorage.getItem(key) || "[]");
      const found = apps.find(
        (a: any) => a.id === applicationId
      );

      if (found) {
        setJob(j);
        setApplication(found);
        setJobId(j.id);

        // 🔁 REACTIVE: auto-mark as viewed
        if (found.status === "new") {
          const updatedApps = apps.map((a: any) =>
            a.id === found.id
              ? { ...a, status: "viewed" }
              : a
          );

          localStorage.setItem(
            key,
            JSON.stringify(updatedApps)
          );

          setApplication({ ...found, status: "viewed" });
        }

        return;
      }
    }

    router.push("/my-listings");
  }, [applicationId, router]);

  function updateStatus(status: string) {
    if (!jobId || !application) return;

    const key = `applications:${jobId}`;
    const apps = JSON.parse(localStorage.getItem(key) || "[]");

    const updated = apps.map((a: any) =>
      a.id === application.id ? { ...a, status } : a
    );

    localStorage.setItem(key, JSON.stringify(updated));
    setApplication({ ...application, status });
  }

  if (!application || !job) return null;

  return (
    <div style={{ maxWidth: 900, margin: "2rem auto" }}>
      <h1>Application — {job.title || job.jobTitle}</h1>

      <div
        style={{
          marginTop: "1.5rem",
          padding: "1rem",
          border: "1px solid var(--border)",
          borderRadius: 8,
          background: "var(--card-bg)",
        }}
      >
        <div>
          <strong>Status:</strong>{" "}
          {STATUS_LABELS[application.status]}
        </div>

        <div style={{ marginTop: "0.75rem" }}>
          <label>
            Internal status:
            <select
              value={application.status}
              onChange={(e) =>
                updateStatus(e.target.value)
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

        <div style={{ marginTop: "1.25rem" }}>
          <strong>Resume</strong>
          <pre
            style={{
              marginTop: "0.5rem",
              whiteSpace: "pre-wrap",
              background: "var(--input-bg)",
              padding: "0.75rem",
              borderRadius: 6,
              maxHeight: 400,
              overflow: "auto",
            }}
          >
            {application.resumeText}
          </pre>
        </div>

        {application.answers?.length > 0 && (
          <div style={{ marginTop: "1.25rem" }}>
            <strong>Application Answers</strong>

            {application.answers.map((a: any) => (
              <div
                key={a.questionId}
                style={{
                  marginTop: "0.75rem",
                  padding: "0.75rem",
                  border: "1px solid var(--border)",
                  borderRadius: 6,
                }}
              >
                <div style={{ fontWeight: 600 }}>
                  {a.questionId}
                </div>
                <p style={{ marginTop: "0.5rem" }}>
                  {a.answer}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={() => router.back()}
        style={{ marginTop: "1.5rem" }}
      >
        ← Back to applicants
      </button>
    </div>
  );
}
