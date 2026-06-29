import { ObjectId } from "mongodb";
import {
  usersCollection,
  tasksCollection,
  paymentsCollection,
} from "../../db/db.js";

const getDashboardStats = async () => {
  const totalUsers = await usersCollection.countDocuments();

  const totalTasks = await tasksCollection.countDocuments();

  const activeTasks = await tasksCollection.countDocuments({
    status: "in_progress",
  });

  const payments = await paymentsCollection.find().toArray();

  const totalRevenue = payments.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  return {
    totalUsers,
    totalTasks,
    activeTasks,
    totalRevenue,
  };
};

const getAllUsers = async () => {
  const users = await usersCollection
    .find()
    .sort({ createdAt: -1 })
    .toArray();

  return users.map((user) => ({
    ...user,
    _id: user._id.toString(),
  }));
};

const blockUser = async (id) => {
  await usersCollection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        blocked: true,
      },
    }
  );

  return { id };
};

const unblockUser = async (id) => {
  await usersCollection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        blocked: false,
      },
    }
  );

  return { id };
};

const getAllTasks = async () => {
  const tasks = await tasksCollection
    .find()
    .sort({ createdAt: -1 })
    .toArray();

  return tasks.map((task) => ({
    ...task,
    _id: task._id.toString(),
  }));
};

const deleteTask = async (id) => {
  await tasksCollection.deleteOne({
    _id: new ObjectId(id),
  });

  return { id };
};

const getAllPayments = async () => {
  const payments = await paymentsCollection
    .find()
    .sort({ createdAt: -1 })
    .toArray();

  return payments.map((payment) => ({
    ...payment,
    _id: payment._id.toString(),
  }));
};

export const adminService = {
  getDashboardStats,
  getAllUsers,
  blockUser,
  unblockUser,
  getAllTasks,
  deleteTask,
  getAllPayments,
};