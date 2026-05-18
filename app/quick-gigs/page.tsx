"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type QuickGig = {
  id: string;
  title?: string;
  summary?: string;
  price?: string;
  status?: "open" | "closed";
};

export default function QuickGigsPage() {
  const router = useRouter();
  const [gigs, setGigs] = useState<QuickGig[]>([]);

  useEffect(() => {
    const storedGigs = localStorage.getItem("quickGigs");
    if (storedGigs) {
      const parsed = JSON.parse(storedGigs);
      setGigs(parsed.filter((gig: QuickGig) => gig.status !== "closed"));
    }
  }, []);

  return (
    <div
      style={{
        padding: "3rem 2rem",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          marginBottom: "2.5rem",
          textAlign: "center",
        }}
      >
        Quick Gigs
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "2rem",
        }}
      >
        {gigs.length === 0 && (
          <p style={{ gridColumn: "1 / -1", textAlign: "center" }}>
            No gigs available right now.
          </p>
        )}

        {gigs.map((gig) => (
          <div
            key={gig.id}
            onClick={() => router.push(`/quick-gigs/${gig.id}`)}
            style={{
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "1.5rem",
              cursor: "pointer",
            }}
          >
            <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
              {gig.title || "Untitled Gig"}
            </h3>

            <p style={{ marginBottom: "1rem" }}>
              {gig.summary || "No description provided."}
            </p>

            <p style={{ fontWeight: "bold" }}>
              ${gig.price || "—"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
