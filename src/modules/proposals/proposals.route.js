import { Router } from "express";
import { proposalsController } from "./proposals.controller.js";

const router = Router();

router.get("/client/:email", proposalsController.getProposalsByClientEmail);
router.patch("/:id/accept", proposalsController.acceptProposal);
router.patch("/:id/reject", proposalsController.rejectProposal);

export const proposalsRoute = router;
