"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Job = {
  id: string;
  jobTitle: string;
  companyName: string;
  employmentType: string;
  payRange: string;
  location: string;
  description: string;
  requirements: string;
  postedBy: string;
  isOpen: boolean;
};

export default function MyJobsPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const storedJobs = localStorage.getItem("jobs");
    const allJobs: Job[] = storedJobs ? JSON.parse(storedJobs) : [];
    setJobs(allJobs);
  }, []);

  function updateJobs(updatedJobs: Job[]) {
    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
  }

  function closeJob(jobId: string) {
    const updated = jobs.map((job) =>
      job.id === jobId ? { ...job, isOpen: false } : job
    );
    updateJobs(updated);
  }

  function reopenJob(jobId: string) {
    const updated = jobs.map((job) =>
      job.id === jobId ? { ...job, isOpen: true } : job
    );
    updateJobs(updated);
  }

  if (jobs.length === 0) {
    return (
      <div style={{ maxWidth: "900px", margin: "2rem auto" }}>
        <h1>My Jobs</h1>
        <p>You haven’t posted any jobs yet.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "900px", margin: "2rem auto" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>
        My Jobs
      </h1>

      {jobs.map((job) => (
        <div
          key={job.id}
          style={{
            border: "1px solid #ddd",
            padding: "1rem",
            marginBottom: "1rem",
            backgroundColor: job.isOpen ? "#ffffff" : "#f9fafb",
            opacity: job.isOpen ? 1 : 0.7,
          }}
        >
          <h2>{job.jobTitle}</h2>
          <p>{job.location} · {job.payRange}</p>
          <p>
            Status:{" "}
            <strong>{job.isOpen ? "Open" : "Closed"}</strong>
          </p>

          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              marginTop: "0.75rem",
            }}
          >
            <button
              onClick={() => router.push(`/employers/my-jobs/edit/${job.id}`)}
            >
              Edit
            </button>

            {job.isOpen ? (
              <button onClick={() => closeJob(job.id)}>
                Close Job
              </button>
            ) : (
              <button onClick={() => reopenJob(job.id)}>
                Reopen Job
              </button>
            )}

            <a href={`/jobs/${job.id}`}>
              View Public Page
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
