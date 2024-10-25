// routes/address.js
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

export default router;
