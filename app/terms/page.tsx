"use client";

export default function TermsPage() {
  function acceptTerms() {
    localStorage.setItem("termsAccepted", "true");
    window.location.href = "/dashboard";
  }

  return (
    <main style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Terms & Conditions</h1>

      <p>
        Before completing your signup, you must agree to the following terms.
      </p>

      <ul>
        <li>All information provided must be accurate</li>
        <li>No spam, scams, or misleading content</li>
        <li>Accounts may be reviewed or removed</li>
        <li>No guarantee of employment or hiring</li>
      </ul>

      <button onClick={acceptTerms} style={{ marginTop: "2rem" }}>
        I Agree & Go to Dashboard
      </button>
    </main>
  );
}
