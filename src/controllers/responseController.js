const History = require("../models/History.js");
const Question = require("../models/Question.js");

async function getResponse(req, res) {
  const { question } = req.body;
  return res.status(200).send({ message: "success" });
}

async function getAllSession(req, res) {
  try {
    const sessionList = await History.find({}, { _id: 1 });

    return res.status(200).send({ message: sessionList });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal server error" });
  }
}

async function addSession(req, res) {
  try {
    const newSession = new History({ chatList: [] });
    const savedSession = await newSession.save();

    return res.status(200).send({ message: savedSession._id });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal server error" });
  }
}

async function saveHistory(req, res) {
  try {
    const { id, question, response } = req.body;

    if (!id) {
      return res.status(201).send({ message: "Missing id in request" });
    }

    if (!question || !response) {
      return res.status(201).send({ message: "Missing question or answer" });
    }

    const history = await History.findById(id);

    if (!history) {
      return res.status(404).send({ message: "Invalid history id" });
    }

    history.chatList.push({ question, response });
    await history.save();

    res.status(200).send({ message: "Success" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal server error" });
  }
}

module.exports = { getResponse, getAllSession, addSession, saveHistory };
