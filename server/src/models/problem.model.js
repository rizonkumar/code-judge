const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    difficulty: {
      type: String,
      enum: {
        values: ["easy", "medium", "hard"],
        message: "{VALUE} is not a valid difficulty level",
      },
      required: [true, "Difficulty level is required"],
      default: "easy",
    },
    testCases: [
      {
        input: {
          type: String,
          required: [true, "Test case input is required"],
        },
        output: {
          type: String,
          required: [true, "Test case output is required"],
        },
      },
    ],
    editorial: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Problem = mongoose.model("Problem", problemSchema);

module.exports = Problem;
