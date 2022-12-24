import mongoose from "mongoose";
/**
 * Schema used for mongodb collection items
 */
const Schema = new mongoose.Schema(
  {
    testId: {
      type: String,
      required: "Test Id is required",
    },
    readingScore: {
      type: Number,
      required: "Reading Score is required",
    },
    writingScore: {
      type: Number,
      required: "Writing Score is required",
    },
    speakingScore: {
      type: Number,
      required: "Speaking Score is required",
    },
    listeningScore: {
      type: Number,
      required: "Question Title is required",
    },
    overallBand: {
      type: Number,
      default: 0,
    },
    testDate: {
      type: Date,
      default: Date.now(),
    },
  },
  { versionKey: false }
);

Schema.virtual("id", () => this._id.toHexString());
Schema.set("toJSON", { virtuals: true });
const model = mongoose.model("score", Schema);

export default model;
