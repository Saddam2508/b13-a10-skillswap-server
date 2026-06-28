import { Router } from "express";
import { tasksController } from "./tasks.controller.js";

const router = Router();

router.post("/", tasksController.createTask);
router.get("/", tasksController.getAllTasks);
router.get("/:id", tasksController.getTaskById);

router.get("/my-tasks", tasksController.getMyTasks);
router.put("/:id", tasksController.updateTask);
router.delete("/:id", tasksController.deleteTask);

export const tasksRoute = router;
