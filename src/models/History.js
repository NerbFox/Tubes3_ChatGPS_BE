const mongoose = require("mongoose");

const historySchema = new mongoose.Schema(
  {
    chatList: [
      {
        question: String,
        response: String,
      },
    ],
  },
  { collection: "History" }
);

module.exports = mongoose.model("History", historySchema);
