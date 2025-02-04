import express from "express";
import {
  addReview,
  getReviewsFromSpecificPullRequest,
} from "../controller/review.controller.js";
import { checkRole, isAuthenticated } from "../utils/middleware.js";
const router = express.Router();

router
  .route("/pull-requests/:id/comments")
  .post(isAuthenticated, checkRole(["Admin", "Reviewer"]), addReview)
  .get(
    isAuthenticated,
    checkRole(["Admin", "Reviewer"]),
    getReviewsFromSpecificPullRequest
  );

export default router;
