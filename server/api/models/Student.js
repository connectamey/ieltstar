import mongoose from "mongoose";
import testHistorySchema from "./TestHistory.js";
/**
 * Schema used for mongodb collection items
 */
const Schema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: "Name is required",
    },
    email: {
        type: String,
        required: "Email is required",
    },
    profileURL: {
        type: String,
        default: "/avatars/avatar_default.jpg",
    },
    testHistory: {
        type: [testHistorySchema],
        default: [],
    },
  },
  { versionKey: false, timestamps: true }
);

const model = mongoose.model("Student", Schema);

export default model;
