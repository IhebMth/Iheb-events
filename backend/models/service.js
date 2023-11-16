const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  serviceId: {
    type: Number,
  },
  nom_service: {
    required: true,
    type: String,
  },
  description: {
    type: String,
  },
  photo: {
    type: String,
  },
  prix: {
    required: true,
    type: String,
  },
  valid: {
    required: false,
    type: Boolean,
    default: false,
  },
  userId: {
    required: true,
    type: Number,
  },
  categoryServiceId: {
    required: true,
    type: Number,
  },
});

module.exports = mongoose.model("service", serviceSchema);
