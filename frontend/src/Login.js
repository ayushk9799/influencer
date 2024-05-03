import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
const CLIENT_ID =
  "708505773923-9fuh2eqg0lr8sgl86p7dsuh2v0pjuslt.apps.googleusercontent.com"; // Replace with your Google Cloud Platform project's client ID
const REDIRECT_URI = "http://localhost:3000/auth/google/callback";

export const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {}, []);

  const handleSignIn = async () => {
    // Create authorization code flow URL
    const authorizationUrl = new URL(
      "https://accounts.google.com/o/oauth2/v2/auth"
    );
    authorizationUrl.searchParams.set("client_id", CLIENT_ID);
    authorizationUrl.searchParams.set("redirect_uri", REDIRECT_URI);
    authorizationUrl.searchParams.set("scope", "profile email");
    authorizationUrl.searchParams.set("response_type", "code");
    authorizationUrl.searchParams.set("access_type", "offline");
    authorizationUrl.searchParams.set("prompt", "consent");

    // Redirect user to Google's authorization endpoint
    window.location.href = authorizationUrl.toString();
  };
  // const handleLogout = () => {
  //   // Clear user's session/token from localStorage
  //   localStorage.removeItem('id_token');
  //   // Update state to reflect logged out status
  //   setIsLoggedIn(false);
  //   setUserEmail(null);
  // };
  return (
    <div>
      {/* {isLoggedIn ? (
        <div>
          <p>You are logged in as: {userEmail}</p>
        </div>
      ) : ( */}
      <button onClick={handleSignIn}>Sign in with Google</button>
      {/* )} */}
    </div>
  );
};
