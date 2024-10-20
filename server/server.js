import express from "express";
import mongoose from "mongoose";
import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { typeDefs, resolvers } from "./schemas/index.js";
import addressRoutes from "./routes/address.js";
import googlePlacesRoutes from "./routes/googlePlacesRoutes.js";
import { authMiddleware } from "./utils/auth.js";

// Initialize dotenv
dotenv.config();

const app = express(); // You need to define the `app` variable
const isLocal = process.env.NODE_ENV !== "production"; // Change to your preferred condition

// Set the MongoDB URI based on the environment
const mongoURI = isLocal
  ? process.env.MONGODB_URI_LOCAL
  : process.env.MONGODB_URI_CLOUD;

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Get __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware to parse JSON
app.use(express.json());

// Serve up static assets
app.use("/images", express.static(join(__dirname, "../client/images")));

const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// REST API route for Google Places services
app.use("/api/google-places", googlePlacesRoutes);

// Route to retrieve addresses from the database
app.use("/api/addresses", addressRoutes);

// Function to start the server
const startServer = async () => {
  // Start the Apollo Server
  await server.start();

  // Set up Apollo Server middleware
  app.use(
    "/graphql",
    server.getMiddleware({
      context: authMiddleware,
    })
  );

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(join(__dirname, "../client/dist")));

    app.get("*", (req, res) => {
      res.sendFile(join(__dirname, "../client/dist/index.html"));
    });
  }

  // Start the Express server
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

// Call the function to start the server
startServer();
