import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import path from "path";
import { authMiddleware } from "./utils/auth.js";
import { typeDefs, resolvers } from "./schemas/index.js";
import connect from "./config/connection.js"; // Import the connect function
import dotenv from "dotenv";
import googlePlacesRouter from "./routes/googlePlacesRoutes.js"; 
import cors from "cors";

dotenv.config(); 
console.log("JWT Secret", process.env.JWT_SECRET);
const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  // Connect to the database
  await connect(); // Wait for the database connection

  await server.start();

//Middleware to parse request
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // enable CORS middleware
  app.use(cors());

  // Google Places API route
    app.use("/api/google-places", googlePlacesRouter); 

    //GraphQL middleware
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: authMiddleware,
    })
  );

  // Serve files in production
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(process.cwd(), "client/dist"))); // Adjusted path to be relative to the current working directory

    app.get("*", (req, res) => {
      res.sendFile(path.join(process.cwd(), "client/dist/index.html")); // Adjusted path to be relative to the current working directory
    });
  }

  // Start the Express server after the database connection is established
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

// Call the async function to start the server
startApolloServer();
