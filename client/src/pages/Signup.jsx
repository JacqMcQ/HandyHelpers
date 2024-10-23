import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { SIGNUP } from "../utils/mutations"; // Import the SIGNUP mutation
import Auth from "../utils/auth"; // Import AuthService
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // Add username state
  const [signup, { data, loading, error }] = useMutation(SIGNUP);

  const navigate = useNavigate(); // Initialize navigate

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const { data } = await signup({
        variables: { firstName, lastName, email, password, username }, // Include username
      });
      // Save the token after successful signup
      Auth.login(data.signup.token); // Use AuthService to log the user in

      // Redirect to profile page
      navigate("/profile");
    } catch (err) {
      console.error(err);
    }
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
        placeholder="Username" // Add username input
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
      <button className="button" type="submit" disabled={loading}>
        Submit
      </button>
      {error && <p>Error signing up!</p>}
    </form>
  );
}

export default Signup;
