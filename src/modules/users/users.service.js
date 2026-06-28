import { usersCollection } from "../../db/db.js";

const getFreelancersFromDB = async () => {
  return await usersCollection
    .find({ role: "freelancer" })
    .sort({ createdAt: -1 })
    .toArray();
};

const getTopFreelancersFromDB = async (limit = 6) => {
  return await usersCollection
    .find({ role: "freelancer" })
    .sort({ createdAt: -1 })
    .limit(limit)
    .toArray();
};

export const usersService = {
  getFreelancersFromDB,
  getTopFreelancersFromDB,
};
