import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "bulma/css/bulma.css";

import App from "./App.jsx";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import CleaningServices from "./pages/CleaningServices";
import LandscapeServices from "./pages/LandscapeServices";
import RepairServices from "./pages/RepairServices";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import JobCenter from "./pages/JobCenter";
import Error from "./pages/Error";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";

// Define the GraphQL endpoint
const GRAPHQL_ENDPOINT = "https://handy-helpers.onrender.com/graphql";

// Create the router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App graphqlEndpoint={GRAPHQL_ENDPOINT} />, // Pass the endpoint here
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "job-center",
        element: <JobCenter />,
      },
      {
        path: "cleaning-services",
        element: <CleaningServices />,
      },
      {
        path: "repair-services",
        element: <RepairServices />,
      },
      {
        path: "landscape-services",
        element: <LandscapeServices />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "faq",
        element: <FAQ />,
      },
    ],
  },
]);

// Render the application
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
