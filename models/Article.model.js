const { Schema, model } = require("mongoose");

const articleSchema = new Schema(
  {
    article: {
      type: Object,
      required: true,
      trim: true
    },
    username: String,
    likes: {
      type: Number,
      default: 0
    },
    bookmarks: {
      type: Number,
      default: 0
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
  },
  {
    timestamps: true
  }
);

const Article = model("Article", articleSchema);

module.exports = Article;