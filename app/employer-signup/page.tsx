"use client";

import { useState } from "react";

export default function EmployerSignupPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    contactFirstName: "",
    contactLastName: "",
    email: "",
    companyType: "",
    website: "",
    location: "",
    hiringFor: "",
    notes: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    console.log("EMPLOYER SIGNUP DATA:", formData);
    window.location.href = "/terms";
  }

  return (
    <main style={{ padding: "2rem", maxWidth: "800px" }}>
      <p>
        ← <a href="/employers">Back to Employers</a>
      </p>

      <h1>Employer Sign Up</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Company Name
          <br />
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
        </label>

        <br /><br />

        <label>
          Company Type
          <br />
          <input
            type="text"
            name="companyType"
            value={formData.companyType}
            onChange={handleChange}
            required
          />
        </label>

        <br /><br />

        <label>
          Website (optional)
          <br />
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
          />
        </label>

        <br /><br />

        <label>
          Location
          <br />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </label>

        <h2>Contact Person</h2>

        <label>
          First Name
          <br />
          <input
            type="text"
            name="contactFirstName"
            value={formData.contactFirstName}
            onChange={handleChange}
            required
          />
        </label>

        <br /><br />

        <label>
          Last Name
          <br />
          <input
            type="text"
            name="contactLastName"
            value={formData.contactLastName}
            onChange={handleChange}
            required
          />
        </label>

        <br /><br />

        <label>
          Email
          <br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <h2>Hiring Info</h2>

        <label>
          What are you hiring for?
          <br />
          <textarea
            name="hiringFor"
            value={formData.hiringFor}
            onChange={handleChange}
            required
          />
        </label>

        <br /><br />

        <label>
          Notes (optional)
          <br />
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </label>

        <br /><br />

        <button type="submit">Continue to Terms</button>
      </form>
    </main>
  );
}
