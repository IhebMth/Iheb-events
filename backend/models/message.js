const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  messageId: {
    type: Number,
  },
  text: {
    required: true,
    type: String,
  },
  date: {
    required: true,
    type: String,
  },
  reservationId: {
    required: true,
    type: Number,
  },
  userId: {
    required: true,
    type: Number,
    unique: true,
  },
});

module.exports = mongoose.model("message", messageSchema);
