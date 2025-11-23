const fs = require("fs");
const History = require("../models/History");
const rateLimit = require('express-rate-limit');

function readJson(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, "utf-8", (err, jsonData) => {
            if (err) reject(err);
            else resolve(JSON.parse(jsonData));
        });
    });
}

async function checkTodayHoroscope(userId) {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    // check if today's record already exists
    const existing = await History.findOne({
        userId,
        date: { $gte: startOfToday, $lte: endOfToday }
    });

    if (existing) {
        return existing;
    }

    return null;
}




module.exports = { readJson, checkTodayHoroscope };