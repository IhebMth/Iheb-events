const mongoose = require("mongoose");

const categoryServiceSchema = new mongoose.Schema({
  categoryServiceId: {
    type: Number,
  },
  libelle: {
    unique: true,
    required: true,
    type: String,
  },
  type: {
    type: String,
  },
});

module.exports = mongoose.model("categoryService", categoryServiceSchema);
