export default function RulesPage() {
  return (
    <main style={{ padding: "2rem", maxWidth: "800px" }}>
      <h1>Rules & Trust</h1>

      <p>
        This platform exists to provide free, fair access to remote work.
        To keep it safe and useful, everyone must follow these rules.
      </p>

      <h2>Identity & Verification</h2>
      <ul>
        <li>All employers must be identifiable</li>
        <li>All job listings are reviewed</li>
        <li>Anonymous job postings are not allowed</li>
      </ul>

      <h2>Job Posting Rules</h2>
      <ul>
        <li>Pay range is required</li>
        <li>Clear job responsibilities are required</li>
        <li>No vague or misleading listings</li>
        <li>No pay-to-work or upfront fees</li>
      </ul>

      <h2>Communication Rules</h2>
      <ul>
        <li>No spam or mass messaging</li>
        <li>No off-platform contact requests</li>
        <li>Employers may only contact applicants</li>
      </ul>

      <h2>Enforcement</h2>
      <ul>
        <li>Listings may be removed at any time</li>
        <li>Accounts may be suspended for violations</li>
      </ul>
    </main>
  );
}
