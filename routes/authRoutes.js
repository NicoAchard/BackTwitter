const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// router.get("/login", authController.indexLogin);
// router.get("/signup", authController.indexSignUp);
router.post("/login", authController.login);

module.exports = router;
