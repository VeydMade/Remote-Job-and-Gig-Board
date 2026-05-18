"use client";

import { useState } from "react";

export default function ReportBug() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  function submit() {
    if (!text.trim()) return;

    const existing = JSON.parse(
      localStorage.getItem("bugReports") || "[]"
    );

    const report = {
      id: crypto.randomUUID(),
      text,
      createdAt: new Date().toISOString(),
      page: window.location.pathname,
    };

    localStorage.setItem(
      "bugReports",
      JSON.stringify([report, ...existing])
    );

    setText("");
    setOpen(false);
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        style={{
          position: "fixed",
          bottom: "1rem",
          left: "1rem",
          border: "1px solid var(--border)",
          borderRadius: "999px",
          padding: "0.4rem 0.75rem",
          background: "var(--card-bg)",
          color: "var(--text)",
          fontSize: "0.85rem",
          cursor: "pointer",
          zIndex: 50,
        }}
      >
        Report a bug
      </button>

      {/* Modal */}
      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
          }}
        >
          <div
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              padding: "1rem",
              width: "90%",
              maxWidth: "420px",
            }}
          >
            <h3 style={{ marginTop: 0 }}>Report a bug</h3>

            <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
              What went wrong? Screenshots aren’t required.
            </p>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={5}
              style={{
                width: "100%",
                boxSizing: "border-box",
                marginTop: "0.5rem",
              }}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "0.5rem",
                marginTop: "1rem",
              }}
            >
              <button onClick={() => setOpen(false)}>
                Cancel
              </button>
              <button onClick={submit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
