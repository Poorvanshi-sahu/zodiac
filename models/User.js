const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a name"]
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: [true, "Email already exists"]
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [6, "Please enter a 6 digit password"],
        select: false
    },
    birthdate: {
        type: Date,
        required: [true, "Date is mandatory"]
    },
    zodiac: {
        type: String
    }
}, {
    timestamps: true
})

userSchema.pre('save', async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

userSchema.methods.generateToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
}

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

module.exports = mongoose.model("User", userSchema);