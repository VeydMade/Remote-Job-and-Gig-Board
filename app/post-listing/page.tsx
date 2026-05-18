"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Profile = {
  id: string;
  type: "employer" | "worker";
};

type ApplicationQuestion = {
  id: string;
  label: string;
  required: boolean;
};

export default function PostListingPage() {
  const router = useRouter();

  const [listingType, setListingType] = useState<"job" | "gig">("job");

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");

  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");

  const [questions, setQuestions] = useState<ApplicationQuestion[]>([]);

  const profile: Profile | null = JSON.parse(
    localStorage.getItem("profile") || "null"
  );

  if (!profile || profile.type !== "employer") {
    return <p style={{ padding: "2rem" }}>Only employers can post listings.</p>;
  }

  function addQuestion() {
    setQuestions([
      ...questions,
      { id: crypto.randomUUID(), label: "", required: false },
    ]);
  }

  function updateQuestion(
    id: string,
    field: "label" | "required",
    value: string | boolean
  ) {
    setQuestions(
      questions.map((q) =>
        q.id === id ? { ...q, [field]: value } : q
      )
    );
  }

  function removeQuestion(id: string) {
    setQuestions(questions.filter((q) => q.id !== id));
  }

  function handleSubmit() {
    if (!title || !summary || !description) {
      alert("Please fill out all required fields.");
      return;
    }

    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();
    const applicationQuestions = questions.filter(
      (q) => q.label.trim() !== ""
    );

    if (listingType === "job") {
      const jobs = JSON.parse(localStorage.getItem("jobs") || "[]");

      const newJob = {
        id,
        title,
        summary,
        description,
        location,
        employerId: profile.id,
        status: "open",
        applicationQuestions,
        createdAt,
      };

      localStorage.setItem("jobs", JSON.stringify([newJob, ...jobs]));
      router.push(`/jobs/${id}`);
    } else {
      if (!price) {
        alert("Please add a price for the gig.");
        return;
      }

      const gigs = JSON.parse(localStorage.getItem("quickGigs") || "[]");

      const newGig = {
        id,
        title,
        summary,
        description,
        price,
        employerId: profile.id,
        status: "open",
        applicationQuestions,
        createdAt,
      };

      localStorage.setItem("quickGigs", JSON.stringify([newGig, ...gigs]));
      router.push(`/quick-gigs/${id}`);
    }
  }

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <h1>Post a Listing</h1>

      {/* LISTING DETAILS */}
      <div
        style={{
          marginTop: "1.5rem",
          border: "1px solid var(--border)",
          borderRadius: "8px",
          padding: "1rem",
          boxSizing: "border-box",
        }}
      >
        <h3 style={{ marginTop: 0 }}>Listing Details</h3>

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", marginBottom: "0.75rem" }}
        />

        <input
          placeholder="Short summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          style={{ width: "100%", marginBottom: "0.75rem" }}
        />

        <textarea
          placeholder="Full description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={6}
          style={{ width: "100%", marginBottom: "1rem" }}
        />

        {listingType === "job" && (
          <input
            placeholder="Location (Remote, Hybrid, etc.)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={{ width: "100%", marginBottom: "0.5rem" }}
          />
        )}

        {listingType === "gig" && (
          <input
            placeholder="Price (e.g. $150)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={{ width: "100%" }}
          />
        )}
      </div>

      {/* APPLICATION QUESTIONS */}
      <div
        style={{
          marginTop: "2rem",
          border: "1px solid var(--border)",
          borderRadius: "8px",
          padding: "1rem",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "0.75rem",
          }}
        >
          <h3 style={{ margin: 0 }}>
            Application Questions{" "}
            <span style={{ color: "var(--muted)" }}>(optional)</span>
          </h3>

          <button
            onClick={addQuestion}
            title="Add question"
            style={{
              border: "1px solid var(--border)",
              borderRadius: "6px",
              padding: "0.25rem 0.6rem",
              cursor: "pointer",
            }}
          >
            +
          </button>
        </div>

        {questions.length === 0 && (
          <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
            Add optional questions applicants will answer when applying.
          </p>
        )}

        {questions.map((q) => (
          <div
            key={q.id}
            style={{
              marginTop: "0.75rem",
              padding: "0.75rem",
              border: "1px solid var(--border)",
              borderRadius: "6px",
              boxSizing: "border-box",
              maxWidth: "100%",
            }}
          >
            <textarea
              placeholder="Question text"
              value={q.label}
              onChange={(e) =>
                updateQuestion(q.id, "label", e.target.value)
              }
              rows={2}
              style={{
                width: "100%",
                maxWidth: "100%",
                boxSizing: "border-box",
                resize: "vertical",
                marginBottom: "0.5rem",
              }}
            />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <label>
                <input
                  type="checkbox"
                  checked={q.required}
                  onChange={(e) =>
                    updateQuestion(q.id, "required", e.target.checked)
                  }
                />{" "}
                Required
              </label>

              <button
                onClick={() => removeQuestion(q.id)}
                style={{ marginLeft: "auto", fontSize: "0.85rem" }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        style={{
          marginTop: "2rem",
          padding: "0.75rem 1.25rem",
          borderRadius: "8px",
          border: "1px solid var(--border)",
          cursor: "pointer",
        }}
      >
        Post Listing
      </button>
    </div>
  );
}
