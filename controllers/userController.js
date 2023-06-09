const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Display the specified resource.
async function show(req, res) {
  let user = await User.findOne({ username: req.params.username }).populate("tweetList"); //Cambiar por "tweets"
  user.tweetList.sort((a, b) => b.createdAt - a.createdAt);
  return res.json(user);
}

async function showFollowing(req, res) {
  const user = await User.findById(req.auth.id).populate("following");
  delete user.password;
  return res.json({ user });
}

async function showFollowers(req, res) {
  const user = await User.findById(req.auth.id).populate("followers");
  delete user.password;
  return res.json({ user });
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
  return;
}

async function store(req, res) {
  try {
    //profilePicture
    const { firstname, username, lastname, email, password, description } = req.body;
    const user = await User.create({
      firstname,
      username,
      lastname,
      email,
      password,
      description: "",
      proflePicture: "",
      tweetList: [],
      following: [],
      followers: [],
    });
    const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET);
    return res.json({ token });
  } catch (error) {
    if (
      error.code === 11000 &&
      error.keyPattern &&
      (error.keyPattern.username === 1 || error.keyPattern.email === 1)
    ) {
      return { error: error };
    } else {
      return console.log("error");
    }
  }
}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {}

module.exports = {
  update,
  destroy,
  show,
  showFollowing,
  showFollowers,
  followUnfollow,
  store,
};
