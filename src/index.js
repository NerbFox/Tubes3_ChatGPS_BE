const express = require("express");
const mongoose = require("mongoose");
const { getResponse } = require("./controllers/responseController.js");
require("dotenv").config();
const app = express();

app.post("/", getResponse);

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
