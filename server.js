const express = require("express");
const app = express();
const http = require("http").createServer(app);
const mongoose = require("mongoose");
const io = require("socket.io")(http);
require("dotenv").config();

var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "*");
  next();
};

// Middlewares
app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(allowCrossDomain);

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
    io.emit("message", req.body);
    res.sendStatus(200);
  });
});

mongoose
  .connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    const server = http.listen(process.env.PORT || 3000, () => {
      console.log("server is runnning on port ", server.address().port);
    });
  })
  .catch((error) => console.log(error));
