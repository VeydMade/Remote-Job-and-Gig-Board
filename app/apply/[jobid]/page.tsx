"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ApplyPage({ params }: { params: { jobId: string } }) {
  const router = useRouter();
  const { jobId } = params;

  const [profile, setProfile] = useState<any>(null);
  const [job, setJob] = useState<any>(null);

  const [resumeSource, setResumeSource] =
    useState<"profile" | "pasted">("profile");
  const [resumeText, setResumeText] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    const storedProfile = localStorage.getItem("profile");
    if (!storedProfile) return router.push("/create-profile");

    const parsedProfile = JSON.parse(storedProfile);
    if (parsedProfile.type !== "worker") return router.push("/");

    setProfile(parsedProfile);
    setResumeText(parsedProfile.resume || "");

    const jobs = JSON.parse(localStorage.getItem("jobs") || "[]");
    const found = jobs.find((j: any) => j.id === jobId);

    if (!found || found.status === "closed") {
      router.push("/jobs");
      return;
    }

    setJob(found);
  }, [jobId, router]);

  function submit() {
    const key = `applications:${jobId}`;
    const existing = JSON.parse(localStorage.getItem(key) || "[]");

    if (existing.some((a: any) => a.applicantProfileId === profile.id)) return;

    const application = {
      id: crypto.randomUUID(),
      jobId,
      applicantProfileId: profile.id,
      resumeSource,
      resumeText,
      answers: Object.entries(answers).map(([qid, answer]) => ({
        questionId: qid,
        answer,
      })),
      status: "new",
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(key, JSON.stringify([...existing, application]));
    router.push("/my-applications");
  }

  if (!job) return null;

  return (
    <div style={{ maxWidth: 700, margin: "2rem auto" }}>
      <h1>Apply to {job.title}</h1>

      <h3 style={{ marginTop: "1.5rem" }}>Resume</h3>

      <label>
        <input
          type="radio"
          checked={resumeSource === "profile"}
          onChange={() => {
            setResumeSource("profile");
            setResumeText(profile.resume || "");
          }}
        />
        Use my site resume
      </label>

      <label style={{ marginLeft: "1rem" }}>
        <input
          type="radio"
          checked={resumeSource === "pasted"}
          onChange={() => {
            setResumeSource("pasted");
            setResumeText("");
          }}
        />
        Paste resume text
      </label>

      <textarea
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
        rows={8}
        style={{ width: "100%", marginTop: "1rem" }}
      />

      {job.applicationQuestions?.length > 0 && (
        <>
          <h3 style={{ marginTop: "2rem" }}>Questions</h3>

          {job.applicationQuestions.map((q: any) => (
            <div key={q.id} style={{ marginTop: "1rem" }}>
              <label>{q.label}</label>
              <textarea
                rows={3}
                value={answers[q.id] || ""}
                onChange={(e) =>
                  setAnswers({ ...answers, [q.id]: e.target.value })
                }
                style={{ width: "100%", marginTop: "0.25rem" }}
              />
            </div>
          ))}
        </>
      )}

      <button
        onClick={submit}
        style={{ marginTop: "2rem" }}
      >
        Submit application
      </button>
    </div>
  );
}
