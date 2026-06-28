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

export const proposalsController = {
  getProposalsByClientEmail,
  acceptProposal,
  rejectProposal,
};
