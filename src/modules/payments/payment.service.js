import { paymentsCollection } from "../../db/db.js";

const createPayment = async (payload) => {
  payload.createdAt = new Date();

  const result = await paymentsCollection.insertOne(payload);

  return result;
};

const getAllPayments = async () => {
  const result = await paymentsCollection

    .find()

    .sort({ createdAt: -1 })

    .toArray();

  return result.map((item) => ({
    ...item,
    _id: item._id.toString(),
  }));
};

export const paymentService = { createPayment, getAllPayments };