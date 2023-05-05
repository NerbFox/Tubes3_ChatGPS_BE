const History = require("../models/History.js");
const Question = require("../models/Question.js");
const { classification } = require("../functions/classification.js");
const {
  calculate,
  getDayName,
  getIdResponse,
  bmMatch,
  kmpMatch,
} = require("../functions/algo.js");

async function getResponse(req, res) {
  // const { question } = req.body;
  // console.log(req.query);
  const typeArray = classification(req.query.question)[0];
  const questionArray = classification(req.query.question)[1];
  console.log(questionArray)
  console.log(typeArray)
  // console.log(typeArray, questionArray);
  let i = 0;
  let prevQues;
  let finalResponse = "";
  let count = 1;
  for (let type in typeArray) {
    // console.log(typeArray[type]);
    if (typeArray[type] == 1) {
      let day = getDayName(questionArray[i]);
      let partResponse = `Hari untuk tanggal ${questionArray[i]} adalah ${day}\n`;
      finalResponse = finalResponse + partResponse;
    }
    if (typeArray[type] == 2) {
      let result = calculate(questionArray[i]);
      let partResponse = `Jawaban untuk persamaan matematika ${questionArray[i]} adalah ${result}\n`;
      finalResponse = finalResponse + partResponse;
    }
    if (typeArray[type] == 3) {
      const regex = /(.+)\s+dengan jawaban\s+(.+)/i;
      const match = questionArray[i].match(regex);
      // console.log(match[1], match[2])
      if(match){
        const question = match[1].trim();
        let answer = match[2];
        answer = answer.replace(/\.$/, "");
        const questions = await Question.find({});
        let searchRes;
        try {
          searchRes = getIdResponse(question, questions, kmpMatch);
        } catch (err) {
          console.error(err);
        }
        // console.log(searchRes);
        if (searchRes[0]) {
          let partResponse = `Pertanyaan "${
            questions[searchRes[1]].question
          }" sudah ada, jawaban diganti menjadi ${answer}\n`;
          // console.log(questions[searchRes[1]].id);
          let id = questions[searchRes[1]].id;
          //update jawaban instead of nambah baru
          let question = await Question.findOneAndUpdate(
            { _id: id },
            { answer },
            { new: true }
          );
          finalResponse = finalResponse + partResponse;
        } else {
          let partResponse = `Pertanyaan "${question}" berhasil ditambah\n`;
          const addedQuestion = new Question({
            question: question,
            answer: answer,
          });
          finalResponse = finalResponse + partResponse;
          addedQuestion
            .save()
            .then(() => {
              console.log("success adding data");
            })
            .catch((err) => {
              console.error(err);
            });
        } 
      }
    }
    if (typeArray[type] == 4) {
      const questions = await Question.find({});
      const question = questionArray[i].trim();
      // console.log(questions);
      let id;
      let searchRes = getIdResponse(question, questions, kmpMatch);
      if (searchRes[0]) {
        id = questions[searchRes[1]].id;
        let partResponse = `Pertanyaan "${question}" telah dihapus\n`;
        finalResponse = finalResponse + partResponse;
        await Question.findOneAndDelete({ _id: id });
      } else {
        let partResponse = `Tidak ada pertanyaan "${question}" di dalam database\n`;
        finalResponse = finalResponse + partResponse;
      }
    }
    if (typeArray[type] == 5) {
      if (prevQues != questionArray[i]) {
        let id;
        const question = questionArray[i].trim();
        const questions = await Question.find({});
        let searchRes = getIdResponse(question, questions, kmpMatch);
        if (searchRes[0]) {
          id = questions[searchRes[1]].id;
          let answer = questions[searchRes[1]].answer;
          let partResponse = `Jawaban untuk "${question}" adalah "${answer}"\n`;
          finalResponse = finalResponse + partResponse;
        }
        // console.log("menjawab pertanyaan");
      }
      prevQues = questionArray[i];
      // console.log(prevQues);
    }
    i++;
  }
  console.log(finalResponse);
  return res.status(200).send({
    message:
      finalResponse === ""
        ? "ChatGPS tidak dapat menjawab query kamu :("
        : finalResponse,
  });
}

async function getAllSession(req, res) {
  try {
    const sessionList = await History.find().sort({ dateCreated: -1 }).limit(5);

    return res.status(200).send({ message: sessionList });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal server error" });
  }
}

async function addSession(req, res) {
  try {
    const newSession = new History({ chatList: [], dateCreated: new Date() });
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

