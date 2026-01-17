import express from "express";
import {
  getAvailableSlotsController,
  updateSensorSlotController,
} from "../../controller";

const router = express.Router();

// Public Routes
router.get("/", getAvailableSlotsController);
router.post("/", updateSensorSlotController);

export default router;
