import express from "express";
import { verifyToken } from "../../utils";
import { createReservationController } from "../../controller";

const router = express.Router();

// Public Routes
router.post("/", verifyToken, createReservationController);

export default router;
