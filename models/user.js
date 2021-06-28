//user modelconst mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: String,
    profileId: String,
    });
  
  mongoose.model("rooms", roomSchema);
  