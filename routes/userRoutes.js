const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/following", userController.showFollowing);
router.get("/followers", userController.showFollowers);
router.post("/follow", userController.followUnfollow);
// router.get("/", userController.index);
// router.get("/crear", ensureAuthenticated, userController.create);
router.get("/:username", userController.show);
// router.post("/", userController.store);
// router.get("/editar/:id", userController.edit);
// router.patch("/:id", userController.update);
// router.delete("/:id", userController.destroy);

// router.post("/follow", ensureAuthenticated, userController.index);

module.exports = router;
