const express = require("express");
const horoscopeModule = require("../module/horoscopeModule");
const { isAuthenticated } = require("../middleware/auth");
const { horoscopeLimiter } = require("../middleware/rateLimit");
const router = express.Router();

router.get("/today", horoscopeLimiter, isAuthenticated, horoscopeModule.getTodayHoroscope);
router.get("/history", horoscopeLimiter, isAuthenticated, horoscopeModule.getHoroscopeHistory);

module.exports = router;
