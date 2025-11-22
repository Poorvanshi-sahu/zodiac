
const User = require("../models/user");
const { getZodiacSign } = require("../utils/zodiac");

exports.register = async (req, res) => {
    try {
        const { name, email, password, birthdate } = req.body;

        let user = await User.findOne({ email });

        if (user) {
            return res.status(409).json({
                success: false,
                message: "User already exists",
            })
        }

        const zodiac = getZodiacSign(birthdate);

        user = await User.create({
            name,
            email,
            password,
            birthdate,
            zodiac
        });

        const token = await user.generateToken();

        const options = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };

        res.status(201).cookie("token", token, options).json({
            success: true,
            user,
            token,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error && error.message ? error.message : String(error)
        })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid creds"
            })
        }

        const token = await user.generateToken();

        const options = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true
        };

        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error && error.message ? error.message : String(error),
        });
    }
}

exports.logOut = async (req, res) => {
    try {
        res
            .status(200)
            .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
            .json({
                success: true,
                message: "Logged Out",
            });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
