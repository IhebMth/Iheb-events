const mongoose = require("mongoose");

const avisSchema = new mongoose.Schema({
  avisId: {
    type: Number,
  },
  text: {
    required: true,
    type: String,
  },
  Evaluation: {
    required: true,
    type: Number,
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

module.exports = mongoose.model("avis", avisSchema);
