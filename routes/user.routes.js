import express from "express";
import { loginApi, signupApi } from "../controller/user.controller.js";
const router = express.Router();

router.post("/signup", signupApi);
router.post("/login", loginApi);

// router.get("/", isAuthenticated, checkRole(["Admin", "Developer"]));

export default router;
