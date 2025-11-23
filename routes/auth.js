const express = require("express");
const router = express.Router();
const userModule = require("../module/userModule");
const { isAuthenticated } = require("../middleware/auth");
const { horoscopeLimiter } = require("../middleware/rateLimit");
const validator = require("../middleware/validator");

router.post("/register", horoscopeLimiter, validator.registerValidation, userModule.register);

router.post("/login", horoscopeLimiter, validator.loginValidation, userModule.login);

router.get("/logout", horoscopeLimiter, isAuthenticated, userModule.logOut);

module.exports = router;


