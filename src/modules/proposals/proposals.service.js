import { ObjectId } from "mongodb";
import { proposalsCollection, tasksCollection } from "../../db/db.js";

const getProposalsByClientEmailFromDB = async (clientEmail) => {
  const tasks = await tasksCollection
    .find({ client_email: clientEmail })
    .toArray();

  const taskIds = tasks.map((t) => t._id.toString());

  const proposals = await proposalsCollection
    .find({ task_id: { $in: taskIds } })
    .sort({ submitted_at: -1 })
    .toArray();

  const result = proposals.map((proposal) => {
    const task = tasks.find((t) => t._id.toString() === proposal.task_id);
    return { ...proposal, task };
  });

  return result;
};

const acceptProposalInDB = async (proposalId) => {
  const proposal = await proposalsCollection.findOne({
    _id: new ObjectId(proposalId),
  });

  if (!proposal) throw new Error("Proposal not found");

  const alreadyAccepted = await proposalsCollection.findOne({
    task_id: proposal.task_id,
    status: "accepted",
  });

  if (alreadyAccepted) {
    throw new Error("A proposal has already been accepted for this task");
  }

  await proposalsCollection.updateOne(
    { _id: new ObjectId(proposalId) },
    { $set: { status: "accepted" } },
  );

  return proposal;
};

const rejectProposalInDB = async (proposalId) => {
  await proposalsCollection.updateOne(
    { _id: new ObjectId(proposalId) },
    { $set: { status: "rejected" } },
  );
  return { message: "Proposal rejected" };
};



const createProposalInDB = async (data) => {
  const { taskId, freelancerEmail, proposedBudget, estimatedDays, coverNote } = data;
 
  if (!taskId || !freelancerEmail || !proposedBudget || !estimatedDays || !coverNote)
    throw new Error("All fields are required.");
 
  // one proposal per task per freelancer
  const existing = await proposalsCollection.findOne({ taskId, freelancerEmail });
  if (existing) throw new Error("You have already submitted a proposal for this task.");
 
  const task = await tasksCollection.findOne({ _id: new ObjectId(taskId) });
  if (!task) throw new Error("Task not found.");
 
  const proposal = {
    taskId,
    taskTitle: task.title,
    clientEmail: task.client_email,
    freelancerEmail,
    proposedBudget: Number(proposedBudget),
    estimatedDays: Number(estimatedDays),
    coverNote,
    status: "pending",
    createdAt: new Date(),
  };
 
  const result = await proposalsCollection.insertOne(proposal);
  return { ...proposal, _id: result.insertedId.toString() };
};
 
const getAllProposalsFromDB = async (taskId, freelancerEmail) => {
  const query = {};
  if (taskId) query.taskId = taskId;
  if (freelancerEmail) query.freelancerEmail = freelancerEmail;
 
  const proposals = await proposalsCollection.find(query).sort({ createdAt: -1 }).toArray();
  return proposals.map((p) => ({ ...p, _id: p._id.toString() }));
};
 
const updateProposalStatus = async (id, status) => {
  if (!["accepted", "rejected"].includes(status))
    throw new Error("Invalid status.");
 
  await proposalsCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { status, updatedAt: new Date() } }
  );
 
  // if accepted → update task status to in-progress
  if (status === "accepted") {
    const proposal = await proposalsCollection.findOne({ _id: new ObjectId(id) });
    if (proposal) {
      await tasksCollection.updateOne(
        { _id: new ObjectId(proposal.taskId) },
        { $set: { status: "in-progress", assignedFreelancer: proposal.freelancerEmail } }
      );
    }
  }
 
  return { id };
};
 
const checkProposalExists = async (taskId, email) => {
  const proposal = await proposalsCollection.findOne({ taskId, freelancerEmail: email });
  return { exists: !!proposal };
};


export const proposalsService = {
  getProposalsByClientEmailFromDB,
  acceptProposalInDB,
  rejectProposalInDB,
  createProposalInDB,
  getAllProposalsFromDB,
  updateProposalStatus,
  checkProposalExists,
};
