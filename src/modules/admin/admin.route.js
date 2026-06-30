import { Router } from "express";
import { adminController } from "./admin.controller.js";
import verifyToken from "../../utility/verifyToken.js";
import {verifyRole } from "../../middleware/verifyRole.js"

const router = Router();

router.get("/stats", verifyToken, verifyRole("admin"), adminController.getDashboardStats);

router.get("/users", verifyToken, verifyRole("admin"), adminController.getAllUsers);

router.patch("/users/:id/block", verifyToken, verifyRole("admin"), adminController.blockUser);

router.patch("/users/:id/unblock", verifyToken, verifyRole("admin"), adminController.unblockUser);

router.get("/tasks", verifyToken, verifyRole("admin"), adminController.getAllTasks);

router.delete("/tasks/:id", verifyToken, verifyRole("admin"), adminController.deleteTask);

router.get("/payments", verifyToken, verifyRole("admin"), adminController.getAllPayments);

export const adminRoute = router;