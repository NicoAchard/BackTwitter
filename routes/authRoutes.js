const express = require("express");
const router = express.Router();
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const flashMessage = require("../middlewares/flashMessage");
const authController = require("../controllers/authController");

// cambiar los controladores
router.get("/login", authController.indexLogin);
router.get("/signup", authController.indexSignUp);
router.post("/login", authController.login);
router.post("/signup", flashMessage, authController.store);
router.post("/logout", ensureAuthenticated, authController.indexLogout);

module.exports = router;
