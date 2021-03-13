const { Message } = require("../Models/Message");

const index = (req, res) => {
  Message.find().then((data) => {
    res.send(data).catch((e) => {
      console.log(e);
    });
  });
};

const store = (req, res) => {
  const msg = new Message(req.body);
  const io = req.app.get("socketio");

  msg.save((e) => {
    if (e) {
      sendStatus(500);
    }

    io.emit("message", req.body);
    res.sendStatus(200);
  });
};
module.exports = {
  index,
  store,
};
