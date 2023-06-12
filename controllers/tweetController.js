const Tweet = require("../models/Tweet");
const User = require("../models/User");

async function index(req, res) {
  try {
    const user = await User.findById(req.auth.id);
    let tweets = await Tweet.find({
      $or: [{ author: { $in: user.following } }, { author: user.id }],
    }).populate("author");

    tweets.sort((a, b) => b.createdAt - a.createdAt);
    tweets = tweets.slice(0, 20);

    return res.json({ tweets: tweets });
  } catch (e) {
    return console.log(e);
  }
}

// Store a newly created resource in storage.
async function store(req, res) {
  try {
    const tweet = await Tweet.create({
      content: req.body.content,
      author: req.auth.id,
      createdAt: new Date(),
      likes: [],
    });

    const user = await User.findById(req.auth.id);
    user.tweetList.push(tweet.id);
    await user.save();
    let tweets = await Tweet.find({
      $or: [{ author: { $in: user.following } }, { author: user.id }],
    }).populate("author");

    tweets.sort((a, b) => b.createdAt - a.createdAt);
    tweets = tweets.slice(0, 20);

    return res.json({ tweets: tweets });
  } catch (e) {
    return console.log(e);
  }
}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {
  const user = await User.findById(req.auth.id).populate("tweetList");
  await Tweet.findByIdAndDelete(req.params.id);

  user.tweetList = user.tweetList.filter((tweet) => tweet.id.toString() !== req.params.id);
  await user.save();

  return res.json({ tweetList: user.tweetList, user });
}

async function like(req, res) {
  try {
    const tweet = await Tweet.findById(req.body.tweetId);

    if (tweet.likes.includes(req.auth.id)) {
      tweet.likes.pull(req.auth.id);
      await tweet.save();
    } else {
      tweet.likes.push(req.auth.id);
      await tweet.save();
    }
    return res.json("Se modificó like");
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  index,

  store,
  update,
  destroy,
  like,
};
