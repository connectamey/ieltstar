import mongoose from "mongoose";
/**
 * Schema used for mongodb collection items
 */
const Schema = new mongoose.Schema(
  {

    title: {
      type: String,
      required: "Question Title is required",
     },
      description: {
      type: String,
      default: "",
    },
    options: {
      type: Array,
      default: [],
    },
    type: {
      type: String,
    },
    answer: {
      type: String,
      required: "Correct Answer is required",
    },
    marks: {
      type: Number,
      required: "Marks is required"
    }
  }
);

export default Schema;
