const Tweet = require("../models/Tweet");
const User = require("../models/User");
// Display a listing of the resource.
async function index(req, res) {
  let tweets = await Tweet.find({ author: { $in: req.user.following } }).populate("author");
  // ordena los tweets por la fecha de creacion de forma descendente
  tweets.sort((a, b) => b.createdAt - a.createdAt);
  // recorta los 20 primeros elementos del array
  tweets = tweets.slice(0, 20);
  return res.render("pages/home", { tweets });
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
  show,
  store,
  update,
  destroy,
  like,
};
