const { mongoose, Schema } = require("../db");
const { tweetSchema } = require("./Tweet.js");
const userSchema = new Schema({
  firstName: String,
  lastName: String,
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  createdAt: Date,
  updatedAt: Date,
  description: String,
  profilePicture: String,
  tweetList: [{ type: Schema.Types.ObjectId, ref: "Tweet" }],
  following: [{ type: Schema.Types.ObjectId, ref: "User" }],
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
