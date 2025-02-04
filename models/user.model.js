import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  roles: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Roles" }],
    validate: {
      validator: function (rolesArray) {
        return (
          new Set(rolesArray.map((role) => role.toString())).size ===
          rolesArray.length
        );
      },
    },
  },
  
},{timestamps:true});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = async function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
};

export const User = mongoose.model("User", userSchema);
