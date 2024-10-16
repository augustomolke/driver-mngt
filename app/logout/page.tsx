"use client";

import { useEffect } from "react";

// Note: Logout works with a direct link to NextAuth's unbranded /api/auth/signout
// however signOut does not appear to work consistently (e.g. doesn't clear session) and may cause redirect loops

async function fetchCsrfToken() {
  const response = await fetch("/api/auth/csrf");
  const data = await response.json();
  return data.csrfToken;
}

async function manualSignOut() {
  const csrfToken = await fetchCsrfToken();

  const formData = new URLSearchParams();
  formData.append("csrfToken", csrfToken);
  formData.append("json", "true");

  const response = await fetch("/api/auth/signout", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
  });

  if (response.ok) {
    console.log("Signed out successfully");

    // Additional post processing after signout and the session is cleared...

    window.location.href = "/login";
  } else {
    console.error("Failed to sign out");
  }
}

export default function Logout() {
  // Note: If you are using useEffect, do not use this along with useSession.  This causes a race condition
  // and issues with underlying calls to the session endpoint to interfere with logging out if you have
  // multiple tabs open - See: https://github.com/nextauthjs/next-auth/issues/4612

  // Original example:

  //useEffect(() => {
  //    manualSignOut();
  //}, []);

  manualSignOut();

  return <div>Logging out...</div>;
}
