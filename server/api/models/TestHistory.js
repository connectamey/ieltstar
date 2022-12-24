import mongoose from "mongoose";
/**
 * Schema used for mongodb collection items
 * test type, section and exam id are redundant however to make it easier to query for test history and will be efficient for stats generation
 */
const Schema = new mongoose.Schema(
  {
    //test id can be the id of either reading, listening, writing or speaking which belongs to a particular exam
    examId: {
        type: mongoose.Schema.Types.ObjectId,
        required: "Exam Id is required",
    },
    section: {
        type: Number,
        required: "Section is required",
    },
    testId: {
        type: mongoose.Schema.Types.ObjectId,
        required: "testId is required",
    },
    //test type can be reading, listening, writing or speaking
    testType: {
        type: String,
        enum: ["Reading", "Listening", "Writing", "Speaking"],
        required: "testType is required",
    },
    score: {
        type: Number,
        required: "Score is required",
    },
    //date of the test attempted
    date: {
        type: Date,
        default: Date.now,
    }
  }
);

export default Schema;
