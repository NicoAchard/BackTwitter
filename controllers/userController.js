const User = require("../models/User");
const jwt = require("jsonwebtoken");

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
  const user = await User.findOne({ _id: req.auth.id }).populate("following").populate("followers");
  const userTarget = await User.findById(req.body.id);
  console.log(userTarget);
  if (user.following.some((item) => item._id === userTarget._id)) {
    console.log("Dejaste de seguir");
    user.following.pull(userTarget._id);
    await user.save();
    userTarget.followers.pull(user._id);
    await userTarget.save();
  } else {
    console.log("Empezaste a seguir");
    user.following.push(userTarget._id);
    await user.save();
    userTarget.followers.push(user._id);
    await userTarget.save();
  }
  return res.json({ user });
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
    return res.json({ token, userLoggedId: user._id });
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
