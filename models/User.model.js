const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: false,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: false
    },
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Bookmark"
      }
    ],
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Bookmark"
      }
    ],
    googleID: String,
    imgPath: String,
    imgName: String,
  },
  {
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;