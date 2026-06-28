import { tasksCollection } from "../../db/db.js";
import { ObjectId } from "mongodb";

const getAllTasksFromDB = async (search, category, limit, page = 1) => {
  const query = {};
  if (search) query.title = { $regex: search, $options: "i" };
  if (category && category !== "all") query.category = category;

  const total = await tasksCollection.countDocuments(query);

  const skip = limit ? (page - 1) * limit : 0;
  let cursor = tasksCollection.find(query).skip(skip);
  if (limit) cursor = cursor.limit(limit);

  const tasks = await cursor.toArray();

  // ✅ ObjectId এবং Date serialize করো
  const serialized = tasks.map(task => ({
    ...task,
    _id: task._id.toString(),
    createdAt: task.createdAt?.toISOString() || null,
    deadline: typeof task.deadline === 'object' && task.deadline instanceof Date
      ? task.deadline.toISOString()
      : task.deadline,
  }));

  return { tasks: serialized, total };
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
