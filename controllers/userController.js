const User = require("../models/User");

// Display a listing of the resource.
async function index(req, res) {}

// Display the specified resource.
async function show(req, res) {
  let userUrl = await User.findOne({ username: req.params.username }).populate("tweetList");
  userUrl.tweetList.sort((a, b) => b.createdAt - a.createdAt);
  return res.render("pages/profile", { userUrl });
}

async function showFollowing(req, res) {
  const usersFollowing = await User.find({ followers: { $in: req.user._id } });
  res.render("pages/following", { usersFollowing });
}

async function showFollowers(req, res) {
  const usersFollower = await User.find({ following: { $in: req.user._id } });
  res.render("pages/followers", { usersFollower });
}

async function followUnfollow(req, res) {
  if (req.user.following.includes(req.body.id)) {
    console.log("Dejaste de seguir");
    await User.updateOne({ _id: req.user._id }, { $pull: { following: req.body.id } });
    await User.updateOne({ _id: req.body.id }, { $pull: { followers: req.user._id } });
  } else {
    console.log("Empezaste a seguir");
    await User.updateOne({ _id: req.user._id }, { $push: { following: req.body.id } });
    await User.updateOne({ _id: req.body.id }, { $push: { followers: req.user._id } });
  }
  res.redirect("back");
}

// Display a listing of the resource.
async function index(req, res) {}

// Show the form for creating a new resource
async function create(req, res) {}

// Store a newly created resource in storage.
async function store(req, res) {
  //profilePicture
  const { firstname, username, lastname, email, password, description } = req.body;
  console.log(req.body);
  const user = await User.create({
    firstname,
    username,
    lastname,
    email,
    password,
    proflePicture: "",
    tweetList: [],
    following: [],
    followers: [],
  });
  console.log(user);
  return res.json(user);
}

// Show the form for editing the specified resource.
async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {}

module.exports = {
  edit,
  update,
  destroy,
  show,
  showFollowing,
  showFollowers,
  followUnfollow,
  store,
};
