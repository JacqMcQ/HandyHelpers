import express from "express";
import Address from "../models/Address.js";
import connect from "../config/connection.js";

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
// POST to save a service to an address
router.post("/:id/services", async (req, res) => {
  const { serviceId } = req.body; // Get service ID from request body
  try {
    const address = await Address.findById(req.params.id);
    if (!address) {
      return res.status(404).send("Address not found");
    }

    // Find the service by ID
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).send("Service not found");
    }

    // Add the service to the address
    address.services.push(serviceId);
    await address.save();

    res.status(200).json(address);
  } catch (error) {
    console.error("Error saving service to address:", error);
    res.status(500).send("Error saving service to address");
  }
});

export default router;
