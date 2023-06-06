const express = require("express");
const tweetController = require("../controllers/tweetController");
const router = express.Router();
router.get("/", tweetController.index);
router.post("/", tweetController.store);
router.delete("/:id", tweetController.destroy);

//Futura ruta para dar like

router.post("/like", tweetController.like);

module.exports = router;
