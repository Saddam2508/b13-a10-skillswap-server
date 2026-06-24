import sendResponse from "../../utility/sendResponse.js";
import { tasksService } from "./tasks.service.js";

const getAllTasks = async (req, res) => {
  try {
    const search = req.query.search;
    const type = req.query.type;

    const result = await tasksService.getAllTasksFromDB(search, type);
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

export const tasksController = {
  getAllTasks,
};
