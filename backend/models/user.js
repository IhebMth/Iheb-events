const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userId: {
    type: Number,
  },
  cin: {
    required: false,
    type: String,
  },
  nom: {
    required: true,
    type: String,
  },
  type: {
    required: true,
    type: String,
    default: "U",
  },
  pernom: {
    required: true,
    type: String,
  },
  num_tel: {
    required: true,
    type: String,
  },
  addresse: {
    required: false,
    type: String,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  mdp: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("user", UserSchema);
