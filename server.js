const express = require("express");
const mongoose = require("mongoose");

var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "*");
  next();
};

app.use(express.static(__dirname + "/views"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(allowCrossDomain);

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
