import { tasksCollection } from "../../db/db.js";
import { ObjectId } from "mongodb";

const getAllTasksFromDB = async (search, category, limit) => {
  const query = {};

  if (search) {
    query.title = { $regex: search, $options: "i" };
  }

  if (category && category !== "all") {
    query.category = category;
  }

  let cursor = tasksCollection.find(query);

  if (limit) {
    cursor = cursor.limit(limit);
  }

  return await cursor.toArray();
};

const getTaskByIdFromDB = async (id) => {
  return await tasksCollection.findOne({ _id: new ObjectId(id) });
};

const createTaskInDB = async (taskData) => {
  const {
    title,
    category,
    description,
    budget,
    deadline,
    client_name,
    client_email,
  } = taskData;

  if (
    !title ||
    !category ||
    !description ||
    !budget ||
    !deadline ||
    !client_name ||
    !client_email
  ) {
    throw new Error("All fields are required.");
  }

  const newTask = {
    title,
    category,
    description,
    budget: Number(budget),
    deadline,
    client_name,
    client_email,
    status: "open",
    createdAt: new Date(),
  };

  const result = await tasksCollection.insertOne(newTask);
  return { ...newTask, _id: result.insertedId };
};

export const tasksService = {
  getAllTasksFromDB,
  getTaskByIdFromDB,
  createTaskInDB,
};
