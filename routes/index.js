const userRoutes = require("./userRoutes");
// const publicRoutes = require("./publicRoutes");
const authRoutes = require("./authRoutes");
// const tweetRoutes = require("./tweetRoutes");

module.exports = (app) => {
  app.use("/", authRoutes);
  app.use("/usuarios", userRoutes);
  // app.use("/tweet", tweetRoutes);
  // app.use("/", publicRoutes);
};
