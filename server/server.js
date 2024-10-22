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

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Serve up static assets
  app.use('/images', express.static(path.join(__dirname, '../client/images')));

  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  }));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Call the async function to start the server
startApolloServer();
