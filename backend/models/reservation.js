const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  reservationId: {
    type: Number,
  },
  date: {
    required: true,
    type: Date,
  },
  serviceId: {
    required: true,
    type: Number,
  },
  userId: {
    required: true,
    type: Number,
  },
  description: {
    required: true,
    type: String,
  },
  Montant: {
    required: true,
    type: Number,
  },
  Temps: {
    type: Date,
  },
  lieu: {
    type: String,
  },
  accepted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("reservation", reservationSchema);
