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

export default function MyApplications() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [apps, setApps] = useState<any[]>([]);

  useEffect(() => {
    const storedProfile = localStorage.getItem("profile");
    if (!storedProfile) return router.push("/create-profile");

    const parsed = JSON.parse(storedProfile);
    if (parsed.type !== "worker") return router.push("/");

    setProfile(parsed);

    const jobs = JSON.parse(localStorage.getItem("jobs") || "[]");
    const collected: any[] = [];

    jobs.forEach((job: any) => {
      const key = `applications:${job.id}`;
      const stored = JSON.parse(localStorage.getItem(key) || "[]");

      stored
        .filter((a: any) => a.applicantProfileId === parsed.id)
        .forEach((a: any) =>
          collected.push({ ...a, jobTitle: job.title })
        );
    });

    setApps(collected);
  }, [router]);

  return (
    <div style={{ maxWidth: 800, margin: "2rem auto" }}>
      <h1>My Applications</h1>

      {apps.length === 0 && (
        <p style={{ marginTop: "1rem", color: "var(--muted)" }}>
          You haven’t applied to anything yet.
        </p>
      )}

      {apps.map((app) => (
        <div
          key={app.id}
          style={{
            marginTop: "1rem",
            padding: "1rem",
            border: "1px solid var(--border)",
            borderRadius: 8,
          }}
        >
          <strong>{app.jobTitle}</strong>
          <div>Status: {STATUS_LABELS[app.status]}</div>
          <div style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
            Applied {new Date(app.createdAt).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );
}
