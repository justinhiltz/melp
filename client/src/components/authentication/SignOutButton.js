import React, { useState } from "react";
import { Redirect } from "react-router-dom";

const SignOutButton = () => {
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const signOut = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/v1/user-sessions", {
        method: "delete",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      });
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const respBody = await response.json();
      setShouldRedirect(true);
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  if (shouldRedirect) {
    location.href = "/";
  }

  return (
    <>
      <div className="show-for-small-only">
        <ul className="menu vertical">
          <li>
            <a href="#" onClick={signOut}>
              Sign Out
            </a>
          </li>
        </ul>
      </div>
      <div className="show-for-medium">
        <button type="button" className="button" onClick={signOut}>
          Sign Out
        </button>
      </div>
    </>
  );
};

export default SignOutButton;
