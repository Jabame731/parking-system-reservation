import express from "express";
import { getAvailableSlotsController } from "../../controller";

const router = express.Router();

// Public Routes
router.get("/", getAvailableSlotsController);

export default router;
