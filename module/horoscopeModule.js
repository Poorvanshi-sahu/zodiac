const { respMsg } = require("../config/constants/zodiacConstants");
const horoscopeController = require("../controllers/horoscopeController");
const { OperationalError } = require("../utils/errors");
const logger = console;

class HoroscopeModule {
    async getTodayHoroscope(req, res, next) {
        try {
            let { zodiac, _id: userId } = req.user;

            let reqData = { zodiac, userId };

            const response = await horoscopeController.getTodayHoroscope(reqData);

            return res.status(response.httpStatus).json(response.body);
        } catch (error) {
            logger.log(error);
            return next(new Error(new OperationalError(respMsg.wentWrong)));
        }
    }

    async getHoroscopeHistory(req, res, next) {
        try {
            let { _id: userId } = req.user;

            let reqData = { userId };

            const response = await horoscopeController.getHoroscopeHistory(reqData);

            return res.status(response.httpStatus).json(response.body);
        } catch (error) {
            return next(new Error(new OperationalError(respMsg.wentWrong)));
        }
    }
}

module.exports = new HoroscopeModule();

