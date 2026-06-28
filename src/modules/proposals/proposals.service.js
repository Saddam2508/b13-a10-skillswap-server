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

export const proposalsService = {
  getProposalsByClientEmailFromDB,
  acceptProposalInDB,
  rejectProposalInDB,
};
