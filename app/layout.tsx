import "./globals.css";
import NavBar from "./NavBar";
import ReportBug from "./components/ReportBug";

export const metadata = {
  title: "Job Board",
  description: "A trust-first job board",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* SITE BANNER */}
        <div
          style={{
            width: "100%",
            minHeight: "160px",
            padding: "3rem 2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            background:
              "linear-gradient(135deg, rgba(0,0,0,0.08), rgba(0,0,0,0.02))",
          }}
        >
          <div style={{ maxWidth: "900px" }}>
            <h1
              style={{
                fontSize: "2.25rem",
                marginBottom: "0.75rem",
                letterSpacing: "0.01em",
              }}
            >
              Work, without the gatekeeping
            </h1>

            <p
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.6,
                opacity: 0.85,
              }}
            >
              Browse jobs and gigs freely. No paywalls, no friction — just
              opportunities.
            </p>
          </div>
        </div>

        {/* NAVIGATION */}
        <NavBar />

        <main>{children}</main>

        {/* GLOBAL BUG REPORT */}
        <ReportBug />
      </body>
    </html>
  );
}
