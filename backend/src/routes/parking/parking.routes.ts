import express from "express";
import {
  createParkingSlotController,
  deleteParkingSlotController,
  getAllParkingSlotsController,
  getParkingSlotByIdController,
  updateParkingSlotController,
} from "../../controller";
import { verifyAdmin, verifyToken } from "../../utils";

const router = express.Router();

// Public or User routes
router.get("/", getAllParkingSlotsController);
router.get("/:id", getParkingSlotByIdController);

// Protected Admin routes
router.post("/", verifyToken, verifyAdmin, createParkingSlotController);
router.put("/:id", verifyToken, verifyAdmin, updateParkingSlotController);
router.delete("/:id", verifyToken, verifyAdmin, deleteParkingSlotController);

export default router;
