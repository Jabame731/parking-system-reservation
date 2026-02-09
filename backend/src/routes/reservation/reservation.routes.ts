import express from "express";
import { verifyAdmin, verifyToken } from "../../utils";
import {
  createReservationController,
  deleteReservationByIdController,
  getAllReservationsController,
  getReservationsByUserIdController,
} from "../../controller";

const router = express.Router();

// Public Routes
router.post("/", verifyToken, createReservationController);

router.get("/:id", verifyToken, getReservationsByUserIdController);

// Protected Routes
router.get("/", verifyAdmin, getAllReservationsController);
router.delete("/", verifyAdmin, deleteReservationByIdController);

export default router;
