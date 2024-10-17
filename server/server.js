import express from "express";
import mongoose from "mongoose";
import { graphqlHTTP } from "express-graphql";
import dotenv from "dotenv";
import tidyRoutes from "./routes/tidyRoutes.js";
import schema from "./schemas/index.js";
import addressRoutes from "./routes/address.js";

dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// REST API route for Tidy services
app.use("/api/tidy", tidyRoutes);
// Route to retrieve addresses from the database
app.use("/api/addresses", addressRoutes);

// GraphQL endpoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true, // Enable GraphiQL for testing
  })
);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
