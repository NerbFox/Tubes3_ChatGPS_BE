const History = require("../models/History.js");
const Question = require("../models/Question.js");

// addSession, getResponse, getAllSession, getHistory

async function getResponse(req, res) {
  const { question } = req.body;
  res.status(200).send({ message: "success" });
}

module.exports = { getResponse };
