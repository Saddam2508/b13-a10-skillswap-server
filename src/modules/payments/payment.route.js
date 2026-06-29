import { Router } from "express";
import { paymentController } from "./payment.controller.js";

const router = Router();

router.post("/", paymentController.createPayment);

router.get("/", paymentController.getAllPayments);

export const paymentRoute = router;