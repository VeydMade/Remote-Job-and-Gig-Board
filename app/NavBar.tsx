"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Profile = {
  id: string;
  type: "employer" | "worker";
};

export default function NavBar() {
  const router = useRouter();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const storedProfile = localStorage.getItem("profile");
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }

    const storedTheme =
      (localStorage.getItem("theme") as "light" | "dark") || "light";
    setTheme(storedTheme);
    document.documentElement.setAttribute("data-theme", storedTheme);
  }, []);

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
  }

  return (
    <nav
      style={{
        borderBottom: "1px solid var(--border)",
        padding: "1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* LEFT / MAIN NAV */}
      <div style={{ display: "flex", gap: "1rem" }}>
        {["Home", "Jobs", "Quick Gigs", "Employers", "Workers"].map(
          (label) => (
            <NavLink
              key={label}
              label={label}
              href={
                label === "Home"
                  ? "/"
                  : `/${label.toLowerCase().replace(" ", "-")}`
              }
              theme={theme}
            />
          )
        )}
      </div>

      {/* RIGHT SIDE */}
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        {/* THEME TOGGLE */}
        <label style={{ position: "relative", width: "44px", height: "24px" }}>
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={toggleTheme}
            style={{ display: "none" }}
          />
          <span
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: theme === "dark" ? "#334155" : "#d1d5db",
              borderRadius: "999px",
            }}
          />
          <span
            style={{
              position: "absolute",
              top: "3px",
              left: theme === "dark" ? "22px" : "3px",
              width: "18px",
              height: "18px",
              backgroundColor: "#fff",
              borderRadius: "50%",
              transition: "left 0.2s",
            }}
          />
        </label>

        {/* PROFILE DROPDOWN */}
        {profile ? (
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setOpen(!open)}
              style={{
                border: "1px solid var(--border)",
                background: "transparent",
                padding: "0.5rem 0.9rem",
                borderRadius: "6px",
                color: "var(--text)",
                cursor: "pointer",
                fontSize: "0.95rem",
              }}
            >
              My Profile ▾
            </button>

            {open && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: "120%",
                  width: "220px",
                  padding: "0.75rem",
                  backgroundColor: "var(--card-bg)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  zIndex: 100,
                }}
              >
                <DropdownItem
                  label="View Profile"
                  onClick={() => router.push("/my-profile")}
                  theme={theme}
                />

                <DropdownItem
                  label="Jobs & Gigs"
                  onClick={() => router.push("/my-listings")}
                  theme={theme}
                />

                {profile.type === "employer" && (
                  <DropdownItem
                    label="Post Listing"
                    onClick={() => router.push("/post-listing")}
                    theme={theme}
                  />
                )}
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => router.push("/create-profile")}
            style={{
              border: "1px solid var(--border)",
              background: "transparent",
              padding: "0.5rem 0.9rem",
              borderRadius: "6px",
              cursor: "pointer",
              color: "var(--text)",
              fontSize: "0.95rem",
            }}
          >
            Sign up / Log in
          </button>
        )}
      </div>
    </nav>
  );
}

/* ---------- Helpers ---------- */

function NavLink({
  label,
  href,
  theme,
}: {
  label: string;
  href: string;
  theme: "light" | "dark";
}) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onClick={() => (window.location.href = href)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: "0.5rem 0.9rem",
        borderRadius: "6px",
        fontSize: "1rem",
        backgroundColor: hover
          ? theme === "light"
            ? "#e5e7eb"
            : "#243247"
          : "transparent",
        cursor: "pointer",
      }}
    >
      {label}
    </div>
  );
}

function DropdownItem({
  label,
  onClick,
  theme,
}: {
  label: string;
  onClick: () => void;
  theme: "light" | "dark";
}) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: "0.6rem 0.75rem",
        borderRadius: "6px",
        border: "1px solid var(--border)",
        marginBottom: "0.4rem",
        backgroundColor: hover
          ? theme === "light"
            ? "#e5e7eb"
            : "#243247"
          : "transparent",
        cursor: "pointer",
        fontSize: "0.95rem",
      }}
    >
      {label}
    </div>
  );
}
