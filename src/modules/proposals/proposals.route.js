import { Router } from "express";
import { proposalsController } from "./proposals.controller.js";

const router = Router();

router.post("/", proposalsController.createProposal);
router.get("/client/:email", proposalsController.getProposalsByClientEmail);
router.get("/", proposalsController.getAllProposals);        
router.get("/check", proposalsController.checkProposal);   
router.patch("/:id/accept", proposalsController.acceptProposal);
router.patch("/:id/reject", proposalsController.rejectProposal);
router.patch("/:id/status", proposalsController.updateStatus); 
 

export const proposalsRoute = router;
