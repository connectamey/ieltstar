import mongoose from "mongoose";
import QuestionSchema from "./Question.js";
/**
 * Schema used for mongodb collection items
 */


const Schema = new mongoose.Schema(
  {
    examId: {
        type: String,
        required: "Associated exam id is required",
    },
    section: {
        //Reading has 3 sections for each test, Writing has 2 sections for each test, Listening has 4 sections for each test
        type: Number,
        required: "Section is required",
    },
    category: {
        type: String,
        enum: ["Reading", "Listening", "Writing", "Speaking"],
        required: "Category is required",
    },
    source: {
        //can be a paragraph for reading or audio file path for listening or image file path for writing
        type: String,
    },
    instruction: {
        type: String,
    },
    questions: {
        type: [QuestionSchema],
        default: [],
    },
  },
  { versionKey: false, timestamps: true }
);

const model = mongoose.model("Test", Schema);

export default model;
