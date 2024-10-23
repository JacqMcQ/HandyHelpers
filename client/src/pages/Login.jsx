import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";

function Login(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN);
  const navigate = useNavigate(); // Initialize navigate

const handleFormSubmit = async (event) => {
  event.preventDefault();
  try {
    const mutationResponse = await login({
      variables: { email: formState.email, password: formState.password },
    });

    const token = mutationResponse.data.login.token;
    Auth.login(token);

    // After the token is saved and user is logged in, redirect
    if (Auth.loggedIn()) {
      navigate("/profile");
    }
  } catch (e) {
    console.log(e);
  }
};
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="container my-1 box">
      <h2 className="title">Login</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label className="subtitle">Email:</label>
          <input
            className="input"
            type="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label>Password:</label>
          <input
            className="input"
            placeholder="******"
            type="password"
            name="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        {error ? (
          <div>
            <p className="error-text">Email or Password incorrect</p>
          </div>
        ) : null}
        <div className="flex-row flex-end">
          <button className="button" type="submit">
            Submit
          </button>
        </div>
        <p>Don't have an account? Sign up here!</p>
        <Link className="button" to="/signup">
          Signup
        </Link>
      </form>
    </div>
  );
}

export default Login;
