const express = require("express");
const router = express.Router();
const pagesController = require("../controllers/pagesController");

router.get("/", pagesController.showHome);
router.get("*", pagesController.show404);

module.exports = router;
