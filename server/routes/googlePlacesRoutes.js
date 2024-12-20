import express from "express";
import {
  getCleaningServices,
  getHandymanServices,
  getLandscapingServices 
} from "../controllers/googlePlacesController.js";

const router = express.Router();

// Route to get cleaning services
router.get("/", getCleaningServices);

// Route to get handyman services
router.get("/handyman", getHandymanServices);

// Route to get landscaping services
router.get("/landscaping", getLandscapingServices);

export default router;
