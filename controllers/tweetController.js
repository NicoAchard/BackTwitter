const Tweet = require("../models/Tweet");
const User = require("../models/User");

async function index(req, res) {
  try {
    console.log(req.auth);
    const user = await User.findById(req.auth.id);
    let tweets = await Tweet.find({ author: { $in: user.following } }).populate("author");

    tweets.sort((a, b) => b.createdAt - a.createdAt);
    tweets = tweets.slice(0, 20);
    console.log(typeof tweets);
    return res.json({ tweets: tweets });
  } catch (e) {
    return console.log(e);
  }
}

// Store a newly created resource in storage.
async function store(req, res) {
  console.log(req.body);
  const tweet = await Tweet.create({
    content: req.body.content,
    author: req.auth.id,
    createdAt: new Date(),
    likes: [],
  });

  return res.json({ response: "tweet creado" });
}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {
  if (req.user.tweetList.includes(req.params.id)) {
    await Tweet.findByIdAndRemove(req.params.id);
    await User.updateOne({ _id: req.user._id }, { $pull: { tweetList: req.params.id } });

    res.redirect("back");
  } else {
    res.redirect("back");
  }
}

async function like(req, res) {
  try {
    const tweet = await Tweet.findById(req.body.tweetInfo);
    if (tweet.likes.includes(req.user._id)) {
      await Tweet.findByIdAndUpdate({ _id: tweet._id }, { $pull: { likes: req.user._id } });
      return res.redirect("back");
    } else {
      await Tweet.findByIdAndUpdate({ _id: tweet._id }, { $push: { likes: req.user._id } });
      return res.redirect("back");
    }
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
