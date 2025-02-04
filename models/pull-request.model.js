import mongoose from "mongoose";

const pullRequestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    requesterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    approvers: {
      type: [
        {
          approverId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          status: {
            type: String,
            enum: ["Pending", "Approved", "Rejected"],
          },
          comments: { type: String },
        },
      ],
    },
    status: {
      type: String,
      enum: ["Open", "Approved", "Rejected"],
      default: "Open",
    },
  },
  { timestamps: true }
);

export const PullRequest = new mongoose.model("PullRequest", pullRequestSchema);
