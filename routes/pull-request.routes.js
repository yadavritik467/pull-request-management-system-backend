import express from "express";
import {
    createPullRequest,
    deletePullRequest,
    getAllPullRequest,
    singlePullRequest,
    updatePullRequest,
} from "../controller/pull-request.controller.js";
import { isAuthenticated } from "../utils/middleware.js";
const router = express.Router();

router
  .route("/pull-requests")
  .post(isAuthenticated, createPullRequest)
  .get(isAuthenticated, getAllPullRequest);

router
  .route("/pull-requests/:id")
  .get(isAuthenticated, singlePullRequest)
  .put(isAuthenticated, updatePullRequest)
  .delete(isAuthenticated, deletePullRequest);

export default router;
