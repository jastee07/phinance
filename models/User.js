const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  role: {
    type: String,
    enum: ["member", "admin"],
    default: "member"
  },
  organization: {
    type: Schema.Types.ObjectId,
    ref: "Organization",
    required: true
  }
});

module.exports = User = mongoose.model("users", UserSchema);
