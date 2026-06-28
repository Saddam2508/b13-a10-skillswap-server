import { Router } from "express";
import { tasksController } from "./tasks.controller.js";

const router = Router();

router.post("/", tasksController.createTask);
router.get("/", tasksController.getAllTasks);
router.get("/:id", tasksController.getTaskById);

export const tasksRoute = router;
