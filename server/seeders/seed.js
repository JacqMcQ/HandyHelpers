import mongoose from "mongoose";
import Address from "../models/Address.js";
import addressesData from "./address.json" assert { type: "json" };
import connect from "../config/connection.js"; // Default import

const seedAddresses = async () => {
  try {
    // Connect to MongoDB
    await connect();
    console.log("Connected to MongoDB");

    // Clear existing addresses
    await Address.deleteMany({});
    console.log("Cleared existing addresses");

    // Insert new addresses
    const insertedAddresses = await Address.insertMany(addressesData);
    console.log("Inserted addresses:", insertedAddresses.length); // Log the count of inserted addresses

    // Close the connection
    await mongoose.connection.close();
    console.log("Connection closed");
  } catch (error) {
    console.error("Error seeding addresses:", error);
  }
};

// Invoke the seeding function
seedAddresses();
