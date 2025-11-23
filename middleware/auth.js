const statusCodes = require("../config/constants/statusCodes");
const { respMsg } = require("../config/constants/zodiacConstants");
const user = require("../models/user");
const jwt = require("jsonwebtoken");
const logger = console;

exports.isAuthenticated = async (req, res, next) => {
    try {
        const { token } = req.signedCookies;

        logger.log("token 11", token);

        if (req._parsedUrl.pathname.includes("logout")) {
            res.status(statusCodes.OK).cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
            return next();
        }

        if (!token) {
            return res.status(statusCodes.BAD_REQUEST).json({
                success: false,
                msg: respMsg.loginInFirst,
                data: {}
            });
        }

        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        req.user = await user.findById(decoded.userId);

        return next();
    } catch (error) {
        logger.log("Middleware isAunthenticated: ", error);
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            msg: error.message,
            data: {}
        });
    }
};
