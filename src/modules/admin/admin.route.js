import { Router } from "express";
import { adminController } from "./admin.controller.js";

const router = Router();

router.get("/stats", adminController.getDashboardStats);

router.get("/users", adminController.getAllUsers);

router.patch("/users/:id/block", adminController.blockUser);

router.patch("/users/:id/unblock", adminController.unblockUser);

router.get("/tasks", adminController.getAllTasks);

router.delete("/tasks/:id", adminController.deleteTask);

router.get("/payments", adminController.getAllPayments);

export const adminRoute = router;