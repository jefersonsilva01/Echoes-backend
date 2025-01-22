const { Schema, model } = require("mongoose");

const articleSchema = new Schema(
  {
    article: {
      type: Object,
      required: true,
      trim: true
    },
    userId: { type: String, required: true },
  },
  {
    timestamps: true
  }
);

const Article = model("Article", articleSchema);

module.exports = Article;