const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static(__dirname + "/views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const dbURI = "mongodb://127.0.0.1:27017/messages";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    const server = app.listen(process.env.PORT || 3000, () => {
      console.log("server is runnning on port ", server.address().port);
    });
  })
  .catch((error) => console.log(error));

const Message = mongoose.model("Message", {
  name: String,
  message: String,
});

app.get("/messages", (req, res) => {
  Message.find({}, (err, messages) => {
    res.send(messages);
  });
});

app.post("/messages", (req, res) => {
  const message = new Message(req.body);
  message.save((err) => {
    if (err) {
      sendStatus(500);
    }
    res.sendStatus(200);
  });
});
