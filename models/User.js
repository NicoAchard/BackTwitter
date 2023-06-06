const bcrypt = require("bcryptjs");
const { mongoose, Schema } = require("../db");
const { tweetSchema } = require("./Tweet.js");

const userSchema = new Schema(
  {
    firstname: String,
    lastname: String,
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
  },
  {
    timestamps: true,
  },
);

userSchema.methods.comparePassword = async function comparePassword(password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 8);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
