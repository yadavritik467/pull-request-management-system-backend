import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
  roleName: {
    type: String,
    unique: true,
  },
},{timestamps:true});

export const Roles = mongoose.model("Roles", roleSchema);
