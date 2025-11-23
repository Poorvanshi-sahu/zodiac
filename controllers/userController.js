
const User = require("../models/user");
const createTokenUser = require("../utils/create-token-user");
const { attachCookiesToResponse, createJWT } = require("../utils/jwt");
const getZodiacSign = require("../utils/zodiac");
const statusCodes = require("../config/constants/statusCodes");
const { respMsg } = require("../config/constants/zodiacConstants");
const logger = console;

class UserController {
    async register(reqData) {
        try {
            const { name, email, password, birthdate } = reqData;

            let user = await User.findOne({ email });

            if (user) {
                return {
                    httpStatus: statusCodes.BAD_REQUEST,
                    body: {
                        success: false,
                        msg: respMsg.alreadyExists("User"),
                        data: {}
                    }
                }
            }

            const zodiac = getZodiacSign(birthdate);

            user = await User.create({
                name,
                password,
                email,
                birthdate,
                zodiac
            });

            const tokenData = createTokenUser(user);
            const token = createJWT(tokenData);

            return {
                httpStatus: statusCodes.CREATED,
                body: {
                    success: true,
                    msg: respMsg.created("User"),
                    data: { token }
                }
            }
        } catch (error) {
            logger.log("user controller register: ", error);
            throw new Error(error);
        }
    }

    async login(reqData) {
        try {
            let { email, password } = reqData;

            let user = await User.findOne({ email }).select("+password");

            if (!user) {
                return {
                    httpStatus: statusCodes.BAD_REQUEST,
                    body: {
                        success: false,
                        msg: respMsg.doesNotExists("User"),
                        data: {}
                    }
                }
            }

            const isMatch = await user.matchPassword(password);

            if (!isMatch) {
                return {
                    httpStatus: statusCodes.BAD_REQUEST,
                    body: {
                        success: false,
                        msg: respMsg.inValidCreds,
                        data: {}
                    }
                }
            }

            const tokenData = createTokenUser(user);
            const token = createJWT(tokenData);

            return {
                httpStatus: statusCodes.CREATED,
                body: {
                    success: true,
                    msg: respMsg.login,
                    data: { token }
                }
            }

        } catch (error) {
            logger.log("user controller login: ", error);
            throw new Error(error);
        }
    }

    async logOut() {
        return {
            httpStatus: statusCodes.OK,
            body: {
                success: true,
                msg: respMsg.loggedOut,
                data: {}
            }
        }
    }
}

module.exports = new UserController();