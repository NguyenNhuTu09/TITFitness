import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    lastFirstName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { 
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    phonenumber:{
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
