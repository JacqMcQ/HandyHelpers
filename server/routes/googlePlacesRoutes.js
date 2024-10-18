import express from "express";
import { getCleaningServices } from "../controllers/googlePlacesController.js";

const router = express.Router();

// Route to get cleaning services
router.get("/", getCleaningServices);

export default router;
