const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
  name: { unique: 1, required: true, type: String },
  member: { type: Number, default: 0 },
  online: Number,
});

mongoose.model("rooms", roomSchema);
