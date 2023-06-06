const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/", userController.store);

// router.get("/following", userController.showFollowing);
// router.get("/followers", userController.showFollowers);
// router.post("/follow", userController.followUnfollow);
// router.get("/crear", ensureAuthenticated, userController.create);
// router.get("/:username", userController.show);

module.exports = router;
