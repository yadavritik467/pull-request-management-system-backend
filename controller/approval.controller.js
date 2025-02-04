import expressAsyncHandler from "express-async-handler";
import { ErrorResponse } from "../utils/errorResponse.js";
import { ApprovalSchema } from "../models/approval.model.js";
import { PullRequest } from "../models/pull-request.model.js";

export const addApproval = expressAsyncHandler(async (req, res, next) => {
  const pullRequestId = req.params.id;
  const approverId = req.user?._id;
  const { comments, status } = req.body;
  let pullRequest = await PullRequest.findById(pullRequestId);
  if (!pullRequest)
    return next(new ErrorResponse("No pull Request found", 400));
  if (!status) return next(new ErrorResponse("Please Enter Status", 400));
  if (!comments) return next(new ErrorResponse("Please Enter Comments", 400));

  // await ApprovalSchema.create({
  //   pullRequestId,
  //   approverId,
  //   status,
  // });

  const approverIndex = await pullRequest.approvers.findIndex(
    (approver) => approver.approverId?._id.toString() === approverId.toString()
  );

  if (approverIndex !== -1) {
    //  If approver exists, update their status & comments
    pullRequest.approvers[approverIndex].status = status;
    pullRequest.approvers[approverIndex].comments = comments;
  } else {
    //  If approver is new, add them to the `approvers` array
    pullRequest.approvers.push({
      approverId,
      status,
      comments,
    });
  }

  //   updating pr status based on Approvals
  const allApprovals = await pullRequest.approvers.map((a) => a.status);
  const isAllApproved = await allApprovals.every((s) => s === "Approved");
  if (isAllApproved) {
    pullRequest.status = "Approved";
  } else if (allApprovals?.includes("Rejected")) {
    pullRequest.status = "Rejected";
  } else {
    pullRequest.status = "Open";
  }

  // await pullRequest.save();
  return res.status(201).json({ message: "Approval Added", pullRequest });
});

export const getApprovals = expressAsyncHandler(async (req, res, next) => {
  const pullRequestId = req.params.id;

  const pullRequest = await PullRequest.findById(pullRequestId);

  if (!pullRequest) {
    return next(new ErrorResponse("Pull Request not found", 404));
  }

  // ✅ Step 2: Find Approval History from `Approvals` Collection
  const approvals = await ApprovalSchema.find({ pullRequestId })
    .populate("approverId", "username")
    .sort({ createdAt: -1 });

  return res.status(200).json({
    message: "Approvals retrieved successfully",
    approvals,
  });
});
