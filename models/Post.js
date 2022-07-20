const mongoose = require("mongoose");

const useSchema = mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    value: { type: String },
    author: { type: String },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", useSchema);
module.exports = Post;
