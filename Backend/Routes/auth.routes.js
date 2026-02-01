const express = require("express");
const router = express.Router();
const { register, login,  profile,logout } = require("../Controllers/User.controller");
const {registerValidation,loginValidation} = require("../Middlewares/Validation.middleware");
const { userAuth } = require("../Middlewares/userAuth");

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
router.get("/profile",  userAuth, profile);
router.post("/logout", logout);

module.exports = router;
