import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { ErrorResponse } from "./errorResponse.js";
import { User } from "../models/user.model.js";

const checkToken = async (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) return next(new ErrorResponse("Invalid auth token", 401));
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  return decodedData;
};

export const isAuthenticated = expressAsyncHandler(async (req, res, next) => {
  req.user = await checkToken(req, res, next);
  next();
});


export const checkRole = (allowedRoles) =>
  expressAsyncHandler(async (req, res, next) => {
    req.user = await checkToken(req, res, next);
    const user = await User.findById(req.user?._id).populate({
      path: "roles",
      select: "_id roleName",
    });
    const userRole = await user.roles.map((role) => role.roleName);
    
    const hasValidRole = await allowedRoles?.some((role) =>
      userRole.includes(role)
    );
    if (!hasValidRole) {
      return next(
        new ErrorResponse("You are not authorize to access this", 400)
      );
    }
    return next();
  });
