import  {paymentService} from "./payment.service.js";

const createPayment = async (req, res) => {
  try {
    const result = await paymentService.createPayment(req.body);

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const getAllPayments = async (req, res) => {
  try {
    const result = await paymentService.getAllPayments();

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const paymentController = {
  createPayment,
  getAllPayments,
};