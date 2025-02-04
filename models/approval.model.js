import mongoose from "mongoose";

const approvalSchema = new mongoose.Schema(
  {
    pullRequestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PullRequest",
    },
    approverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      require: true,
    },
  },
  { timestamps: true }
);

export const ApprovalSchema = new mongoose.model(
  "ApprovalSchema",
  approvalSchema
);
