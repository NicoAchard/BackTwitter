const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");
// const tweetRoutes = require("./tweetRoutes");

module.exports = (app) => {
  app.use("/", authRoutes);
  app.use("/usuarios", userRoutes);
  // app.use("/tweet", tweetRoutes);
};
