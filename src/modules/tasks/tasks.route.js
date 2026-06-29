import { Router } from "express";
import { tasksController } from "./tasks.controller.js";

const router = Router();

router.post("/", tasksController.createTask);
router.get("/", tasksController.getAllTasks);
router.get("/my-tasks", tasksController.getMyTasks);
router.get("/active", tasksController.getActiveTasks);    
router.get("/completed", tasksController.getCompletedTasks);
router.get("/:id", tasksController.getTaskById);
router.put("/:id", tasksController.updateTask);
router.delete("/:id", tasksController.deleteTask);
router.get("/:id", tasksController.getTaskById);

router.patch("/:id/status", tasksController.updateTaskStatus);             
router.patch("/:id/deliverable", tasksController.submitDeliverable);

export const tasksRoute = router;
