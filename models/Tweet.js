const { mongoose, Schema } = require("../db");

const tweetSchema = new Schema({
  content: { type: String, required: true, maxLength: 140 },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: Date,
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const Tweet = mongoose.model("Tweet", tweetSchema);

module.exports = Tweet;
