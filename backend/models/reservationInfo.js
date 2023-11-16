const mongoose = require("mongoose");

const ReservationInfoSchema = new mongoose.Schema({
  reservationinfoId: {
    type: Number,
  },
  dated: {
    required: true,
    type: String,
  },
  datef: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  Montant: {
    required: true,
    type: String,
  },
  Title: {
    required: true,
    type: String,
  },
  userId: {
    required: true,
    type: Number,
  },
  accepted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("ReservationInfo", ReservationInfoSchema);
