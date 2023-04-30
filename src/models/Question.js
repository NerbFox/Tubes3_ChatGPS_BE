const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Question must be provided"],
    },
    answer: {
      type: String,
      required: [true, "Answer must be provided"],
    },
  },
  { collection: "questions" }
);

module.exports = mongoose.model("Question", questionSchema);
