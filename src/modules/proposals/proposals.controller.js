import { proposalsService } from "./proposals.service.js";

const getProposalsByClientEmail = async (req, res) => {
  try {
    const result = await proposalsService.getProposalsByClientEmailFromDB(
      req.params.email,
    );
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const acceptProposal = async (req, res) => {
  try {
    const result = await proposalsService.acceptProposalInDB(req.params.id);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const rejectProposal = async (req, res) => {
  try {
    const result = await proposalsService.rejectProposalInDB(req.params.id);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const createProposal = async (req, res) => {
  try {
    const result = await proposalsService.createProposalInDB(req.body);
    res.status(201).json({ success: true, message: "Proposal submitted!", data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
 
const getAllProposals = async (req, res) => {
  try {
    const { taskId, freelancerEmail } = req.query;
    const result = await proposalsService.getAllProposalsFromDB(taskId, freelancerEmail);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
 
const updateStatus = async (req, res) => {
  try {
    const result = await proposalsService.updateProposalStatus(req.params.id, req.body.status);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
 
const checkProposal = async (req, res) => {
  try {
    const { taskId, email } = req.query;
    const result = await proposalsService.checkProposalExists(taskId, email);
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
 


export const proposalsController = {
  getProposalsByClientEmail,
  acceptProposal,
  rejectProposal,
  createProposal,
  getAllProposals,
  updateStatus,
  checkProposal,
};
