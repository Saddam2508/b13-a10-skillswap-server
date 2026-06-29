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



const getMyTasksFromDB = async (email) => {
  const tasks = await tasksCollection.find({ client_email: email }).toArray();
  return tasks.map(task => ({
    ...task,
    _id: task._id.toString(),
    createdAt: task.createdAt?.toISOString() || null,
  }));
};
 
const updateTaskInDB = async (id, data) => {
  const { title, category, description, budget, deadline } = data;
  await tasksCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { title, category, description, budget, deadline, updatedAt: new Date() } }
  );
  return { id };
};
 
const deleteTaskFromDB = async (id) => {
  await tasksCollection.deleteOne({ _id: new ObjectId(id) });
};


 
const getActiveTasksFromDB = async (freelancerEmail) => {
  const tasks = await tasksCollection
    .find({ assignedFreelancer: freelancerEmail, status: "in-progress" })
    .sort({ createdAt: -1 })
    .toArray();
  return tasks.map((t) => ({ ...t, _id: t._id.toString() }));
};


const getCompletedTasksFromDB = async (freelancerEmail) => {
  const tasks = await tasksCollection
    .find({ assignedFreelancer: freelancerEmail, status: "completed" })
    .sort({ updatedAt: -1 })
    .toArray();
  return tasks.map((t) => ({ ...t, _id: t._id.toString() }));
};
 
const updateTaskStatus = async (id, status) => {
  const allowedStatus = [
    "open",
    "in_progress",
    "completed",
  ];

  if (!allowedStatus.includes(status)) {
    throw new Error("Invalid task status.");
  }

  const result = await tasksCollection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        status,
        updatedAt: new Date(),
      },
    }
  );


  if (result.matchedCount === 0) {
    throw new Error("Task not found.");
  }

  return result;
};


const submitDeliverableInDB = async (id, deliverableUrl) => {
  await tasksCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { status: "completed", deliverable_url: deliverableUrl, completedAt: new Date() } }
  );
  return { id };
};
 


export const tasksService = {
  getAllTasksFromDB,
  getTaskByIdFromDB,
  createTaskInDB,
  getMyTasksFromDB,
  updateTaskInDB,
  deleteTaskFromDB,
  getActiveTasksFromDB,
  getCompletedTasksFromDB,
  updateTaskStatus,
  submitDeliverableInDB
};
