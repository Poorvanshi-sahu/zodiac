const validator = require("validator");
const statusCodes = require("../config/constants/statusCodes");
const { respMsg } = require("../config/constants/zodiacConstants");

class Validator {
    async registerValidation(req, res, next) {
        const { name, email, password, birthdate } = req.body;

        if (!name || !email || !password || !birthdate) {
            return res.status(statusCodes.BAD_REQUEST).json({
                success: false,
                msg: respMsg.required,
                data: {}
            })
        }

        if (!validator.isAlpha(name)) {
            return res.status(statusCodes.BAD_REQUEST).json({
                success: false,
                msg: respMsg.invalidName,
                data: {}
            })
        }

        if (!validator.isEmail(email)) {
            return res.status(statusCodes.BAD_REQUEST).json({
                success: false,
                msg: respMsg.invalidEmail,
                data: {}
            })
        }

        if (password.length < 6) {
            return res.status(statusCodes.BAD_REQUEST).json({
                success: false,
                msg: respMsg.invalidPassword,
                data: {}
            })
        }

        if (isNaN(Date.parse(birthdate)) || new Date(birthdate) > new Date()) {
            return res.status(statusCodes.BAD_REQUEST).json({
                success: false,
                msg: respMsg.invalidBirthdate,
                data: {}
            })
        }

        return next()
    }

    async loginValidation(req, res, next) {
        let { email, password } = req.body;

        if (!email || !password) {
            return res.status(statusCodes.BAD_REQUEST).json({
                success: false,
                msg: respMsg.required,
                data: {}
            })
        }

        if (!validator.isEmail(email)) {
            return res.status(statusCodes.BAD_REQUEST).json({
                success: false,
                msg: respMsg.invalidEmail,
                data: {}
            })
        }

        if (password.length < 6) {
            return res.status(statusCodes.BAD_REQUEST).json({
                success: false,
                msg: respMsg.invalidPassword,
                data: {}
            })

        }
        return next();
    }
}

module.exports = new Validator();