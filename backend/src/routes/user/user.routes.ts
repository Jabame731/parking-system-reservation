import express from "express";
import {
  deleteUserController,
  editUserController,
  getAllUsersController,
} from "../../controller";
import { verifyAdmin, verifyToken } from "../../utils";

const router = express.Router();

//protected routes
router.get("/", verifyToken, verifyAdmin, getAllUsersController);
router.patch("/", verifyToken, verifyAdmin, editUserController);
router.delete("/:id", verifyToken, verifyAdmin, deleteUserController);

export default router;
