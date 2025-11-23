// Used to pass only necessary data, controller layer(business logic layer)
// It is also used to pass request to the server and response to user and propagate errors using try catch
const userController = require("../controllers/userController");
const errors = require("../utils/errors");
const { respMsg } = require("../config/constants/zodiacConstants");
const { attachCookiesToResponse } = require("../utils/jwt");
const logger = console;

class UserModule {
    async register(req, res, next) {
        try {
            const { name, email, password, birthdate } = req.body;

            const reqData = { name, email, password, birthdate };

            const response = await userController.register(reqData);

            let token = response.body.data.token;


            if (token) {
                attachCookiesToResponse({ res, token: response.body.data.token })
            }

            return res.status(response.httpStatus).json(response.body);
        } catch (err) {
            return next(new errors.OperationalError(respMsg.wentWrong));
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;

            const reqData = { email, password };

            const response = await userController.login(reqData);

            let token = response.body.data.token;

            if (token) {
                attachCookiesToResponse({ res, token: response.body.data.token })
                // delete response.body.data.token;
            }

            return res.status(response.httpStatus).json(response.body);
        } catch (error) {
            logger.log("line no 51 module", error)
            return next(new errors.OperationalError(respMsg.wentWrong));
        }
    }

    async logOut(req, res, next) {
        try {
            const response = await userController.logOut();

            return res.status(response.httpStatus).json(response.body);
        } catch (error) {
            logger.log("line no 51 module", error)
            return next(new errors.OperationalError(respMsg.wentWrong));
        }
    }
}

module.exports = new UserModule();