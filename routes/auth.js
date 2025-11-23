const express = require("express");
const router = express.Router();
const userModule = require("../module/userModule");
const { isAuthenticated } = require("../middleware/auth");
const { horoscopeLimiter } = require("../middleware/rateLimit");

router.post("/register", horoscopeLimiter, userModule.register);

router.post("/login", horoscopeLimiter, userModule.login);

router.get("/logout", horoscopeLimiter, isAuthenticated, userModule.logOut);

module.exports = router;


