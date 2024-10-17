import express from "express";
import { getServices } from "../controllers/tidyController.js";

const router = express.Router();

router.get("/services/:id", getServices);

export default router;
