const { Schema, model } = require("mongoose");

const SocialLoginSchema = new Schema(
  {
    username: {
      type: String,
      required: false,
      unique: false,
      trim: true
    },
    email: String,
    password: String,
    googleID: String,
    status: String,
    imgPath: String,
    imgName: String,
  },
  {
    timestamps: true
  }
);

const UserSocialLogin = model("UserSocialLogin", SocialLoginSchema);

module.exports = UserSocialLogin;