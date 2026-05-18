"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    setRole(storedRole);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <main style={{ padding: "2rem" }}>
        <p>Loading dashboard...</p>
      </main>
    );
  }

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Dashboard</h1>

      {role === "employer" && (
        <p>
          Welcome, employer. From here you’ll be able to post and manage jobs.
        </p>
      )}

      {role === "talent" && (
        <p>
          Welcome! From here you’ll be able to manage your profile and apply to
          jobs.
        </p>
      )}

      {role === "browser" && (
        <p>
          You’re browsing as a guest. Sign up to unlock more features.
        </p>
      )}

      {!role && (
        <p>
          No role detected. Please return to the home page and choose a role.
        </p>
      )}
    </main>
  );
}
