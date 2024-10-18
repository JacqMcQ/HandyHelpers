import express from "express";
import mongoose from "mongoose";
import { ApolloServer } from "apollo-server-express"; // Ensure you're importing ApolloServer
import dotenv from "dotenv";
import { typeDefs, resolvers } from "./schemas/index.js"; // Make sure this path is correct
import addressRoutes from "./routes/address.js";
import googlePlacesRoutes from "./routes/googlePlacesRoutes.js";

dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// REST API route for Google Places services
app.use("/api/google-places", googlePlacesRoutes);

// Route to retrieve addresses from the database
app.use("/api/addresses", addressRoutes);

// Set up Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Start the Apollo Server
const startServer = async () => {
  await server.start();
  server.applyMiddleware({ app });
};

startServer().then(() => {
  // Start the express server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}${server.graphqlPath}`);
  });
});
