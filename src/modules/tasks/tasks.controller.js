import sendResponse from "../../utility/sendResponse.js";
import { tasksService } from "./tasks.service.js";

const getAllTasks = async (req, res) => {
  try {
    const search = req.query.search;
    const category = req.query.category;
    const limit = req.query.limit ? parseInt(req.query.limit) : null;

    const result = await tasksService.getAllTasksFromDB(
      search,
      category,
      limit,
    );
    res.status(200).json({
      success: true,
      message: "Users retrived successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const createTask = async (req, res) => {
  try {
    const result = await tasksService.createTaskInDB(req.body);
    res.status(201).json({
      success: true,
      message: "Task created successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const tasksController = {
  getAllTasks,
  createTask,
};
