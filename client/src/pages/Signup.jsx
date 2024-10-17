import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

const SIGNUP_USER = gql`
  mutation Signup(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    signup(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      id
      firstName
      lastName
      email
    }
  }
`;

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signup, { data, loading, error }] = useMutation(SIGNUP_USER);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup({ variables: { firstName, lastName, email, password } });
      // Handle post-signup actions (like redirecting)
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        Sign Up
      </button>
      {error && <p>Error signing up!</p>}
    </form>
  );
}

export default Signup;
