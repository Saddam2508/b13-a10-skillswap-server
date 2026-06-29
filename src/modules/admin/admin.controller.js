import  {adminService} from "./admin.service.js";

const getDashboardStats = async (req, res) => {
  try {
    const result = await adminService.getDashboardStats();

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const result = await adminService.getAllUsers();

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const blockUser = async (req, res) => {
  try {
    const result = await adminService.blockUser(req.params.id);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const unblockUser = async (req, res) => {
  try {
    const result = await adminService.unblockUser(req.params.id);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const result = await adminService.getAllTasks();

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const result = await adminService.deleteTask(req.params.id);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getAllPayments = async (req, res) => {
  try {
    const result = await adminService.getAllPayments();

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const adminController = {
  getDashboardStats,
  getAllUsers,
  blockUser,
  unblockUser,
  getAllTasks,
  deleteTask,
  getAllPayments,
};