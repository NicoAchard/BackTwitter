const express = require("express");
const router = express.Router();
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const userController = require("../controllers/userController");
const pagesController = require("../controllers/pagesController");

router.get("/following", ensureAuthenticated, userController.showFollowing);
router.get("/followers", ensureAuthenticated, userController.showFollowers);
router.post("/follow", ensureAuthenticated, userController.followUnfollow);
// router.get("/", userController.index);
// router.get("/crear", ensureAuthenticated, userController.create);
router.get("/:username", ensureAuthenticated, userController.show);
// router.post("/", userController.store);
// router.get("/editar/:id", userController.edit);
// router.patch("/:id", userController.update);
// router.delete("/:id", userController.destroy);

// router.post("/follow", ensureAuthenticated, userController.index);

module.exports = router;
