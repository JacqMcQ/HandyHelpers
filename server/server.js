import express from "express";
import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { typeDefs, resolvers } from "./schemas/index.js";
import addressRoutes from "./routes/address.js";
import googlePlacesRoutes from "./routes/googlePlacesRoutes.js";
import { authMiddleware } from "./utils/auth.js";
import connect from "./config/connection.js";

// Initialize dotenv
dotenv.config();

const app = express(); // You need to define the `app` variable


// Get __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Set the port
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON
app.use(express.json());

// REST API route for Google Places services
app.use("/api/google-places", googlePlacesRoutes);

// Route to retrieve addresses from the database
app.use("/api/addresses", addressRoutes);


const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Function to start the server
const startServer = async () => {
  try {
    // Establish the database connection
    await connect();

    // Initialize Apollo Server
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    await server.start();

    // Apply Apollo GraphQL middleware
    app.use(
      "/graphql",
      expressMiddleware(server, {
        context: async ({ req }) => ({
          user: await authMiddleware(req),
        }),
      })
    );

    // Serve static assets in production
    if (process.env.NODE_ENV === "production") {
      app.use(express.static(join(__dirname, "../client/dist")));
      app.get("*", (req, res) => {
        res.sendFile(join(__dirname, "../client/dist/index.html"));
      });
    }
    // Start the server
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`GraphQL available at http://localhost:${PORT}/graphql`);
    });
  } catch (err) {
    console.error("Error starting server:", err);
  }
};

// Call the function to start the server
startServer();