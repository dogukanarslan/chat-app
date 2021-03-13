const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  name: String,
  message: String,
});

const Message = mongoose.model("Message", messageSchema);

module.exports.Message = Message;
