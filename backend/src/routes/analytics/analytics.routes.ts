import express from "express";
import { getDashboardAnalyticsDataController } from "../../controller";
import { verifyAdmin, verifyToken } from "../../utils";

const router = express.Router();

//protected routes
router.get("/", getDashboardAnalyticsDataController);

export default router;
