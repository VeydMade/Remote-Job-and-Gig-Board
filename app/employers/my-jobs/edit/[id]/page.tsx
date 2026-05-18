"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

export default function EditJobPage() {
  const { id } = useParams();
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    const storedJobs = localStorage.getItem("jobs");
    if (!storedJobs) return;

    const jobs: Job[] = JSON.parse(storedJobs);
    const foundJob = jobs.find((j) => j.id === id);

    if (foundJob) {
      setJob(foundJob);
    }
  }, [id]);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();

    if (!job) return;

    const storedJobs = localStorage.getItem("jobs");
    const jobs: Job[] = storedJobs ? JSON.parse(storedJobs) : [];

    const updatedJobs = jobs.map((j) =>
      j.id === job.id ? job : j
    );

    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
    router.push("/employers/my-jobs");
  }

  if (!job) {
    return <p style={{ padding: "2rem" }}>Loading job…</p>;
  }

  const fieldStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
  };

  const inputStyle: React.CSSProperties = {
    padding: "0.5rem",
    fontSize: "1rem",
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "2rem auto",
        padding: "2rem",
        border: "1px solid #ddd",
        borderRadius: "6px",
        backgroundColor: "#fff",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>
        Edit Job
      </h1>

      <form
        onSubmit={handleSave}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <div style={fieldStyle}>
          <label>Job Title</label>
          <input
            style={inputStyle}
            value={job.jobTitle}
            onChange={(e) =>
              setJob({ ...job, jobTitle: e.target.value })
            }
            required
          />
        </div>

        <div style={fieldStyle}>
          <label>Company Name</label>
          <input
            style={inputStyle}
            value={job.companyName}
            disabled
          />
        </div>

        <div style={fieldStyle}>
          <label>Employment Type</label>
          <input
            style={inputStyle}
            value={job.employmentType}
            onChange={(e) =>
              setJob({ ...job, employmentType: e.target.value })
            }
            required
          />
        </div>

        <div style={fieldStyle}>
          <label>Pay Range</label>
          <input
            style={inputStyle}
            value={job.payRange}
            onChange={(e) =>
              setJob({ ...job, payRange: e.target.value })
            }
            required
          />
        </div>

        <div style={fieldStyle}>
          <label>Location</label>
          <input
            style={inputStyle}
            value={job.location}
            onChange={(e) =>
              setJob({ ...job, location: e.target.value })
            }
            required
          />
        </div>

        <div style={fieldStyle}>
          <label>Description</label>
          <textarea
            style={{ ...inputStyle, minHeight: "100px" }}
            value={job.description}
            onChange={(e) =>
              setJob({ ...job, description: e.target.value })
            }
            required
          />
        </div>

        <div style={fieldStyle}>
          <label>Requirements</label>
          <textarea
            style={{ ...inputStyle, minHeight: "100px" }}
            value={job.requirements}
            onChange={(e) =>
              setJob({ ...job, requirements: e.target.value })
            }
            required
          />
        </div>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginTop: "1.5rem",
          }}
        >
          <button
            type="submit"
            style={{
              padding: "0.75rem 1.5rem",
              fontSize: "1rem",
              backgroundColor: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Save Changes
          </button>

          <button
            type="button"
            onClick={() => router.push("/employers/my-jobs")}
            style={{
              padding: "0.75rem 1.5rem",
              fontSize: "1rem",
              backgroundColor: "#e5e7eb",
              color: "#111",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
