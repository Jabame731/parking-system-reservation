import express from "express";
import { verifyToken } from "../../utils";
import {
  approvePaypalOrderController,
  createPaypalReservationController,
} from "../../controller";

const router = express.Router();

// Public Routes
router.post(
  "/createPaypalReservation",
  verifyToken,
  createPaypalReservationController,
);

router.post("/approvePaypalPayment", verifyToken, approvePaypalOrderController);

export default router;
