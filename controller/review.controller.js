import expressAsyncHandler from "express-async-handler";
import { ReviewSchema } from "../models/review.model.js";
import { ErrorResponse } from "../utils/errorResponse.js";

// create Review
export const addReview = expressAsyncHandler(async (req, res, next) => {
  const { comments } = req.body;
  const pullRequestId = req.params.id;
  const reviewerId = req.user._id;
  if (!comments) return next(new ErrorResponse("Please write comments", 400));

  //   save the review in review collection
  await ReviewSchema.create({
    pullRequestId,
    reviewerId,
    comments,
  });
  return res.status(201).json({ message: "Comments Added " });
});
export const getReviewsFromSpecificPullRequest = expressAsyncHandler(
  async (req, res, next) => {
    const pullRequestId = req.params.id;
    const allReviewsFromSpecificPullRequest = await ReviewSchema.find({
      pullRequestId,
    });
    if (!allReviewsFromSpecificPullRequest?.length)
      return next(new ErrorResponse("No Comments Found", 400));

    return res
      .status(201)
      .json({
        message: "All Comments",
        allComments: allReviewsFromSpecificPullRequest,
      });
  }
);
