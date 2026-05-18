"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";

export default function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);

  const [job, setJob] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem("jobs") || "[]");
    const found = jobs.find((j: any) => j.id === id);

    if (!found) {
      router.push("/jobs");
      return;
    }

    setJob(found);

    const storedProfile = localStorage.getItem("profile");
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
  }, [id, router]);

  if (!job) return null;

  const isOwner =
    profile &&
    profile.type === "employer" &&
    (job.employerId === profile.id ||
      job.postedBy === profile.id);

  return (
    <div style={{ maxWidth: 720, margin: "2rem auto" }}>
      <h1>{job.title || job.jobTitle}</h1>

      {job.summary && (
        <p style={{ color: "var(--muted)", marginTop: "0.5rem" }}>
          {job.summary}
        </p>
      )}

      {job.description && (
        <div style={{ marginTop: "1.5rem" }}>
          <h3>About this role</h3>
          <p style={{ whiteSpace: "pre-wrap" }}>
            {job.description}
          </p>
        </div>
      )}

      {/* Worker apply */}
      {profile?.type === "worker" &&
        (job.status ?? "open") === "open" && (
          <button
            onClick={() => router.push(`/apply/${job.id}`)}
            style={{ marginTop: "2rem" }}
          >
            Apply
          </button>
        )}

      {/* Employer controls (only if owner) */}
      {isOwner && (
        <div style={{ marginTop: "2rem" }}>
          <button
            onClick={() =>
              router.push(`/jobs/${job.id}/applicants`)
            }
          >
            View applicants
          </button>
        </div>
      )}
    </div>
  );
}
