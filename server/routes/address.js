import express from "express";
import Address from "../models/Address.js";
import Service from "../models/Service.js"; // Import the Service model
import connect from "../config/connection.js";
import mongoose from "mongoose";

const router = express.Router();

router.use(async (req, res, next) => {
  try {
    await connect();
    next();
  } catch (error) {
    console.error("MongoDB connection error:", error);
    res.status(500).send("Database connection error");
  }
});

// GET all addresses per user
router.get("/", async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user._id });
    res.json(addresses);
  } catch (error) {
    console.error("Error retrieving addresses:", error);
    res.status(500).send("Error retrieving addresses");
  }
});

// GET an address by ID
router.get("/:id", async (req, res) => {
  console.log(`GET request received for address ID: ${req.params.id}`);
  try {
    const address = await Address.findById(req.params.id);
    if (!address) {
      return res.status(404).send("Address not found");
    }
    console.log("Retrieved address:", address);
    res.json(address);
  } catch (error) {
    console.error("Error retrieving address:", error);
    res.status(500).send("Error retrieving address");
  }
});

// POST a service to a specific address by ID
router.post("/:id/services", async (req, res) => {
  const { id } = req.params;
  const { serviceId } = req.body; // Assuming the request body includes serviceId

  // Validate the address ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid address ID" });
  }

  // Validate serviceId
  if (!mongoose.Types.ObjectId.isValid(serviceId)) {
    return res.status(400).json({ error: "Invalid service ID" });
  }

  try {
    const address = await Address.findById(id);
    if (!address) {
      return res.status(404).json({ error: "Address not found" });
    }

    // Check if the service exists
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(400).json({ error: "Service ID does not exist." });
    }

    // Add the service to the address
    address.services.push(serviceId); // Ensure serviceId matches the type defined in the schema
    await address.save();

    res
      .status(200)
      .json({ message: "Service successfully added to address", address });
  } catch (error) {
    console.error("Error saving service to address:", error);
    res.status(500).json({ error: "Failed to save service to address" });
  }
});

export default router;
