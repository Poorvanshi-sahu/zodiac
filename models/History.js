// src/models/History.js
const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    zodiac: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
    horoscopeText: { type: String, required: true },
});

module.exports = mongoose.model("History", historySchema);
