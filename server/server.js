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
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });


const PORT = process.env.PORT || 5000;
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
  app.use(
    cors({
      origin: "https://handyhelpers.onrender.com",
      credentials: true,
    })
  );
  // Google Places API route
  app.use("/api/google-places", googlePlacesRouter);

  //GraphQL middleware
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: authMiddleware,
    })
  );

  // Serve static files and handle routes conditionally based on the environment
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(process.cwd(), "client/dist")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(process.cwd(), "client/dist/index.html"));
    });
  } else {
    app.use(express.static(path.join(process.cwd(), "client/dist"))); 
  }
  // Start the Express server after the database connection is established
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

// Call the async function to start the server
startApolloServer();
