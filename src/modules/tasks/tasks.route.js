import { Router } from "express";
import { tasksController } from "./tasks.controller.js";

const router = Router();

router.post("/", tasksController.createTask);
router.get("/", tasksController.getAllTasks);

export const tasksRoute = router;
