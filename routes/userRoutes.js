const express = require("express");
const router = express.Router();
const { expressjwt: checkJwt } = require("express-jwt");
const userController = require("../controllers/userController");

router.post("/", userController.store);

router.get(
  "/following",
  checkJwt({ secret: process.env.TOKEN_SECRET, algorithms: ["HS256"] }),
  userController.showFollowing,
);

router.get(
  "/followers",
  checkJwt({ secret: process.env.TOKEN_SECRET, algorithms: ["HS256"] }),
  userController.showFollowers,
);

router.post(
  "/follow",
  checkJwt({ secret: process.env.TOKEN_SECRET, algorithms: ["HS256"] }),
  userController.followUnfollow,
);

// router.get("/crear", ensureAuthenticated, userController.create);
router.get(
  "/:username",
  checkJwt({ secret: process.env.TOKEN_SECRET, algorithms: ["HS256"] }),
  userController.show,
);

module.exports = router;
