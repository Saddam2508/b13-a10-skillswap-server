import { client } from "./index.js";

const db = client.db("skill_swap");
export const tasksCollection = db.collection("tasks");
export const usersCollection = db.collection("user");
export const proposalsCollection = db.collection("proposals");
export const paymentsCollection = db.collection("payments");