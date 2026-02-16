import express from "express";
import {
  createParkingSlotController,
  deleteParkingSlotController,
  getAllParkingSlotsController,
  getParkingSlotByIdController,
  getParkingSlotsStreamController,
  updateParkingSlotController,
} from "../../controller";
import { verifyAdmin, verifyToken } from "../../utils";

const router = express.Router();

// Public or User routes
router.get("/", getAllParkingSlotsController);
//SSE CONNECTION
router.get("/stream", getParkingSlotsStreamController);
router.get("/:id", getParkingSlotByIdController);

// Protected Admin routes
router.post("/", verifyToken, verifyAdmin, createParkingSlotController);
router.put(
  "/updateSlot",
  verifyToken,
  verifyAdmin,
  updateParkingSlotController,
);
router.delete("/:id", verifyToken, verifyAdmin, deleteParkingSlotController);

export default router;
