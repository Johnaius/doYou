const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  seven: {
    type: String,
    required: true,
  },
  five: {
    type: String,
    required: true,
  },
  three: {
    type: String,
    required: true,
  },
  one: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", PostSchema);
