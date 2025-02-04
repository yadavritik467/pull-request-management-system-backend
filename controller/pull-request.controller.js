import expressAsyncHandler from "express-async-handler";
import { PullRequest } from "../models/pull-request.model.js";
import { ReviewSchema } from "../models/review.model.js";
import { ApprovalSchema } from "../models/approval.model.js";
import { ErrorResponse } from "../utils/errorResponse.js";

// create pull request
export const createPullRequest = expressAsyncHandler(async (req, res, next) => {
  const { title, description } = req.body;
  if (!title) return next(new ErrorResponse("Please write title", 400));
  if (!description)
    return next(new ErrorResponse("Please write description", 400));
  await PullRequest.create({ title, description, requesterId: req.user?._id });
  return res.status(201).json({ message: "Pull Request created" });
});

// all pull request
export const getAllPullRequest = expressAsyncHandler(async (req, res, next) => {
  const allPullRequest = await PullRequest.find({}).populate(
    "requesterId",
    "username"
  );
  if (allPullRequest?.length) {
    return res
      .status(200)
      .json({ message: "All Pull Request", allPullRequest });
  }
  return next(new ErrorResponse("No Pull Request Found", 404));
});

// single pull request
export const singlePullRequest = expressAsyncHandler(async (req, res, next) => {
  const singlePr = await PullRequest.findById(req.params?.id)
    .populate("requesterId", "username")
    .populate("approvers.approverId", "username");
  if (!singlePr) {
    return next(new ErrorResponse("No Pull Request Found", 404));
  }
  return res.status(200).json({ message: "Single Pull Request", singlePr });
});

// update pull Request

export const updatePullRequest = expressAsyncHandler(async (req, res, next) => {
  let pullRequestStatus = await PullRequest.findById(req.params?.id);

  if (!pullRequestStatus) {
    return next(new ErrorResponse("Pull Request not found !!", 404));
  }
  if (pullRequestStatus.status === "Rejected") {
    return next(
      new ErrorResponse("This Pull request has been rejected !!", 400)
    );
  }
  const { title, description } = req.body;
  if (title) {
    pullRequestStatus.title = title;
  }
  if (description) {
    pullRequestStatus.description = description;
  }
  await pullRequestStatus.save();
  return res.status(200).json({ message: "Pull Request Updated" });
});

// delete pull request
export const deletePullRequest = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const singlePr = await PullRequest.findById(id);
  if (!singlePr) {
    return next(new ErrorResponse("No Pull Request Found", 404));
  }
  try {
    // Delete associated reviews & approvals in parallel
    await Promise.all([
      ReviewSchema.deleteMany({ pullRequestId: id }),
      ApprovalSchema.deleteMany({ pullRequestId: id }),
    ]);

    await singlePr.deleteOne();

    return res
      .status(200)
      .json({ message: "Pull Request deleted successfully" });
  } catch (error) {
    return next(new ErrorResponse("Failed to delete Pull Request", 500));
  }
});
