const express = require("express");
const tweetController = require("../controllers/tweetController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const router = express.Router();
// router(ensureAuthenticated);
router.get("/", ensureAuthenticated, tweetController.index);
router.post("/", ensureAuthenticated, tweetController.store);
router.delete("/:id", ensureAuthenticated, tweetController.destroy);

//Futura ruta para dar like

router.post("/like", ensureAuthenticated, tweetController.like);

module.exports = router;
