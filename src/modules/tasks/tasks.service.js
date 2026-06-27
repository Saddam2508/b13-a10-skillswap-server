import { tasksCollection } from "../../db/db.js";

const getAllTasksFromDB = async (search, type) => {
  const query = {};

  if (search) {
    query.facilityName = { $regex: search, $options: "i" };
  }

  if (type) {
    query.facilityType = { $in: [type] };
  }

  const allTasks = await tasksCollection.find(query).toArray();
  return allTasks;
};

const createTaskInDB = async (taskData) => {
  const { title, category, description, budget, deadline, client_email } =
    taskData;

  if (
    !title ||
    !category ||
    !description ||
    !budget ||
    !deadline ||
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
    client_email,
    status: "open",
    createdAt: new Date(),
  };

  const result = await tasksCollection.insertOne(newTask);
  return { ...newTask, _id: result.insertedId };
};

export const tasksService = {
  getAllTasksFromDB,
  createTaskInDB,
};
