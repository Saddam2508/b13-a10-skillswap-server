import sendResponse from "../../utility/sendResponse.js";
import { tasksService } from "./tasks.service.js";

const getAllTasks = async (req, res) => {
  try {
    const search = req.query.search;
    const category = req.query.category;
    const limit = req.query.limit ? parseInt(req.query.limit) : null;
    const page = req.query.page ? parseInt(req.query.page) : 1;

    const result = await tasksService.getAllTasksFromDB(search, category, limit, page);

    res.status(200).json({
      success: true,
      message: "Tasks retrieved successfully!",
      data: result.tasks,
      total: result.total,  
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    const result = await tasksService.getTaskByIdFromDB(req.params.id);
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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

const getMyTasks = async (req, res) => {
  console.log(req)
  try {
    const email = req.query.email;
    
    console.log(email)
    if (!email) return res.status(400).json({ success: false, message: "Email required" });
 
    const result = await tasksService.getMyTasksFromDB(email);
    console.log(result)
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
 
const updateTask = async (req, res) => {
  try {
    const result = await tasksService.updateTaskInDB(req.params.id, req.body);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
 
const deleteTask = async (req, res) => {
  try {
    await tasksService.deleteTaskFromDB(req.params.id);
    res.status(200).json({ success: true, message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
 


const getActiveTasks = async (req, res) => {
  try {
    const result = await tasksService.getActiveTasksFromDB(req.query.freelancerEmail);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
 
const getCompletedTasks = async (req, res) => {
  try {
    const result = await tasksService.getCompletedTasksFromDB(req.query.freelancerEmail);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
 
const submitDeliverable = async (req, res) => {
  try {
    const result = await tasksService.submitDeliverableInDB(req.params.id, req.body.deliverableUrl);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
 


export const tasksController = {
  getAllTasks,
  getTaskById,
  createTask,
  getMyTasks,
  updateTask,
  deleteTask,
  getActiveTasks,
  getCompletedTasks,
  submitDeliverable
};
