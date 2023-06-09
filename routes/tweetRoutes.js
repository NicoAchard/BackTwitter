const express = require("express");
const tweetController = require("../controllers/tweetController");
const { expressjwt: checkJwt } = require("express-jwt");
const router = express.Router();

router.get(
  "/",
  checkJwt({ secret: process.env.TOKEN_SECRET, algorithms: ["HS256"] }),
  tweetController.index,
);
router.post(
  "/",
  checkJwt({ secret: process.env.TOKEN_SECRET, algorithms: ["HS256"] }),
  tweetController.store,
);
router.delete(
  "/:id",
  checkJwt({ secret: process.env.TOKEN_SECRET, algorithms: ["HS256"] }),
  tweetController.destroy,
);

router.post(
  "/like",
  checkJwt({ secret: process.env.TOKEN_SECRET, algorithms: ["HS256"] }),
  tweetController.like,
);

module.exports = router;
