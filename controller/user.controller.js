import expressAsyncHandler from "express-async-handler";
import { Roles } from "../models/roles.model.js";
import { User } from "../models/user.model.js";
import { ErrorResponse } from "../utils/errorResponse.js";

export const signupApi = expressAsyncHandler(async (req, res, next) => {
  const { username, email, password, role } = req.body;
  if (!username) return next(new ErrorResponse("Please enter user name", 400));
  if (!email) return next(new ErrorResponse("Please enter email", 400));
  if (!password) return next(new ErrorResponse("Please enter password", 400));
  if (!role)
    return next(
      new ErrorResponse(
        "Please enter role like Admin or Reviewer or Developer",
        400
      )
    );
  let user = await User.findOne({ email });
  if (user)
    return next(new ErrorResponse("User already exists with this email", 404));
  let findRole = await Roles.findOne({ roleName: role });
  if (!findRole) {
    findRole = await Roles.create({ roleName: role });
  }
  user = await User.create({
    email,
    password,
    username,
    roles: [findRole],
  });

  return res.status(200).json({ message: "User Created Successfully", user });
});

export const loginApi = expressAsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new ErrorResponse("Please enter email and password", 400));
  const user = await User.findOne({ email });
  if (!user) return next(new ErrorResponse("User Not Found", 404));

  const isMatchPassword = await user.matchPassword(password);
  if (!isMatchPassword) return next(new ErrorResponse("Invalid password", 400));
  const token = await user.generateToken();

  return res.status(200).json({ message: "Login Successfully", token });
});
