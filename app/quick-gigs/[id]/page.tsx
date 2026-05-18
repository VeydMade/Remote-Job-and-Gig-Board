"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function QuickGigDetailPage() {
  const params = useParams();
  const [gig, setGig] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("quickGigs");
    if (!stored) return;

    const gigs = JSON.parse(stored);
    const found = gigs.find((g: any) => g.id === params.id);
    setGig(found);
  }, [params.id]);

  if (!gig) {
    return <p style={{ padding: "2rem" }}>Gig not found.</p>;
  }

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto" }}>
      <h1>{gig.title}</h1>

      <p style={{ color: "var(--muted)", fontSize: "1.1rem" }}>
        ${gig.price}
      </p>

      <hr />

      <p>{gig.description}</p>

      <button style={{ marginTop: "2rem" }}>
        Apply (coming soon)
      </button>
    </div>
  );
}
