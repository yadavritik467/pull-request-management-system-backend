import express from "express";
import { checkRole, isAuthenticated } from "../utils/middleware.js";
import {
  addApproval,
  getApprovals,
} from "../controller/approval.controller.js";

const router = express.Router();
router
  .route("/pull-requests/:id/approvals")
  .post(isAuthenticated, checkRole(["Admin", "Reviewer"]), addApproval)
  .get(isAuthenticated, checkRole(["Admin", "Reviewer"]), getApprovals);

export default router;
