const { Schema, model } = require("mongoose");

const bookmarkSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    articles: [
      {
        type: Schema.Types.ObjectId,
        ref: "Model"
      }
    ],
    userId: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true
  }
);

const Bookmark = model("Bookmark", bookmarkSchema);

module.exports = Bookmark;