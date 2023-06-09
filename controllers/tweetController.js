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
  const tweet = await Tweet.create({
    content: req.body.content,
    author: req.user._id,
    createdAt: new Date(),
    likes: [],
  });

  req.user.tweetList.push(tweet);
  await req.user.save();

  // const currentDate = new Date();
  // const monthIndex = currentDate.getMonth();
  // const monthNames = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  //   "August",
  //   "September",
  //   "October",
  //   "November",
  //   "December",
  // ];
  // const monthName = monthNames[monthIndex].substring(0, 3);

  return res.redirect(`/usuarios/${req.user.username}`);
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
    const tweet = await Tweet.findById(req.body.tweetId);
    console.log(req.auth);
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
