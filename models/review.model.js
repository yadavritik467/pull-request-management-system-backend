import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    pullRequestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PullRequest",
    },
    reviewerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    comments: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

export const ReviewSchema = new mongoose.model("ReviewSchema", reviewSchema);
