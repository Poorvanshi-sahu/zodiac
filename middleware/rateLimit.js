const rateLimit = require('express-rate-limit');

// Limit 5 requests per minute per user/IP
const horoscopeLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 500,               // limit each IP/user to 5 requests per window
    message: {
        success: false,
        message: "Too many requests. Please try again after a minute."
    }
});

module.exports = { horoscopeLimiter };