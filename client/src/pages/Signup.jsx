import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { SIGNUP } from "../utils/mutations";
import Auth from "../utils/auth";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [signup, { loading, error }] = useMutation(SIGNUP);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match!");
      return;
    }

    try {
      const { data } = await signup({
        variables: { firstName, lastName, email, password, username },
      });

      Auth.login(data.signup.token);

      // Dispatch custom event to notify components about login status change
      const event = new Event("loginStatusChanged");
      window.dispatchEvent(event);

      // Redirect to profile page after signup
      navigate("/profile");
    } catch (err) {}
  };

  return (
    <form className="box" onSubmit={handleSignup}>
      <h2 className="title">Sign Up</h2>
      <input
        className="input"
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <input
        className="input"
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
      <input
        className="input"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        className="input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className="input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        className="input"
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
      <button className="button" type="submit" disabled={loading}>
        Submit
      </button>
      {error && <p>Error signing up!</p>}
    </form>
  );
}

export default Signup;
