const express = require("express");
const mongoose = require("mongoose");
const {
  getResponse,
  getAllSession,
  addSession,
  saveHistory,
} = require("./controllers/responseController.js");
require("dotenv").config();
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.get("/", getResponse);
app.get("/session", getAllSession);
app.post("/session", addSession);
app.post("/history", saveHistory);

async function start() {
  try {
    await mongoose.connect(
      "mongodb+srv://test_user:test_user123@test-cluster.styaf4q.mongodb.net/chatgps-tubes-stima?retryWrites=true&w=majority",
      {
        connectTimeoutMS: 300000,
      }
    );
    const port = process.env.PORT || 5000;
    app.listen(port, console.log(`listening on port ${port}`));
  } catch (err) {
    console.log(err);
  }
}
start();
