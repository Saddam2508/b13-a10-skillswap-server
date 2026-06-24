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

export const tasksService = {
  getAllTasksFromDB,
};
