import express from "express";
import {
  getCleaningServices,
  getHandymanServices,
} from "../controllers/googlePlacesController.js";

const router = express.Router();

// Route to get cleaning services
router.get("/", getCleaningServices);

// Route to get handyman services
router.get("/handyman", getHandymanServices);

export default router;