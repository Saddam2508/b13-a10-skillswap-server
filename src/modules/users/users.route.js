import { Router } from "express";
import { usersController } from "./users.controller.js";

const router = Router();

router.get("/freelancers", usersController.getFreelancers);
router.get("/freelancers/top", usersController.getTopFreelancers);

export const usersRoute = router;
