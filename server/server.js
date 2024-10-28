import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import path from "path";
import { authMiddleware } from "./utils/auth.js";
import { typeDefs, resolvers } from "./schemas/index.js";
import connect from "./config/connection.js";
import dotenv from "dotenv";
import googlePlacesRouter from "./routes/googlePlacesRoutes.js";
import addressRouter from "./routes/address.js";
import cors from "cors";

// Load environment variables
dotenv.config();
console.log("JWT Secret", process.env.JWT_SECRET);

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Function to start Apollo server
const startApolloServer = async () => {
  // Connect to the database
  await connect(); // Wait for the database connection
  await server.start();

  // Middleware to parse request bodies
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Enable CORS middleware
  app.use(cors());

  // Google Places API route
  app.use("/api/google-places", googlePlacesRouter);

  // Address API route
  app.use("/api/addresses", addressRouter); 

  // GraphQL middleware
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: authMiddleware,
    })
  );

  // Serve files in production
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(process.cwd(), "client/dist")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(process.cwd(), "client/dist/index.html"));
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
