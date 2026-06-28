import { usersService } from "./users.service.js";

const getFreelancers = async (req, res) => {
  try {
    const result = await usersService.getFreelancersFromDB();
    res.status(200).json({
      success: true,
      message: "Freelancers retrieved successfully!",
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

const getTopFreelancers = async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 6;
    const result = await usersService.getTopFreelancersFromDB(limit);
    res.status(200).json({
      success: true,
      message: "Top freelancers retrieved successfully!",
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

export const usersController = {
  getFreelancers,
  getTopFreelancers,
};
