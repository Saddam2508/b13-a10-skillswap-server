import { client } from "./index.js";

const db = client.db("skill_swap");
export const tasksCollection = db.collection("tasks");
