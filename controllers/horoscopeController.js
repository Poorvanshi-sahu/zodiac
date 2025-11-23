const { respMsg } = require("../config/constants/zodiacConstants");
const statusCodes = require("../config/constants/statusCodes");
const History = require("../models/History");
const fs = require("fs");
const path = require("path");
const logger = console;
const { readJson, checkTodayHoroscope } = require("../utils/utility");
const zodiac = require("../utils/zodiac");

class HoroscopeController {
    // GET /horoscope/today
    async getTodayHoroscope(reqData) {
        try {
            let { zodiac, userId } = reqData;

            if (!zodiac) {
                return {
                    httpStatus: statusCodes.BAD_REQUEST,
                    body: {
                        success: false,
                        msg: respMsg.doesNotExists("zodiac"),
                        data: {}
                    }
                }
            }

            zodiac = zodiac.toLowerCase();

            let historyData = await checkTodayHoroscope(userId);

            if (historyData) {
                return {
                    httpStatus: statusCodes.OK,
                    body: {
                        success: true,
                        msg: respMsg.alreadyExists("horoscope for today"),
                        data: { horoscope: historyData.horoscopeText, zodiac: historyData.zodiac }
                    }
                }
            }

            let date = new Date();
            let day = date.getDay();

            const filePath = path.join(__dirname, "..", "data", "horoscope.json");

            const data = await readJson(filePath);

            if (!data || !data[zodiac] || !data[zodiac][day]) {
                return {
                    httpStatus: statusCodes.NOT_FOUND,
                    body: {
                        success: false,
                        msg: respMsg.doesNotExists("horoscope"),
                        data: {}
                    }
                }
            }

            let today_horoscope = data[zodiac][day];

            historyData = await History.create({
                userId,
                zodiac,
                horoscopeText: today_horoscope
            });

            return {
                httpStatus: statusCodes.OK,
                body: {
                    success: true,
                    msg: respMsg.fetched,
                    data: { horoscope: today_horoscope, zodiac }
                }
            }
        } catch (error) {
            logger.log("horoscope controller getTodayHoroscope: ", error);
            throw new Error(error)
        }
    }

    // GET /horoscope/history
    async getHoroscopeHistory(reqData) {
        try {
            let { userId } = reqData;

            if (!userId) {
                return {
                    httpStatus: statusCodes.BAD_REQUEST,
                    body: {
                        success: false,
                        msg: respMsg.doesNotExists("userId"),
                        data: {}
                    }
                }
            }

            const historyData = await History.find({ userId })
                .sort({ date: -1 })
                .limit(7)
                .lean();

            if (!historyData || !historyData.length) {
                return {
                    httpStatus: statusCodes.NOT_FOUND,
                    body: {
                        success: false,
                        msg: respMsg.doesNotExists("history"),
                        data: {}
                    }
                }
            }

            const result = [];
            const zodiac = historyData[0]?.zodiac;

            historyData.forEach(e => {
                result.push({
                    date: e.date,
                    horoscope: e.horoscopeText
                });
            });

            return {
                httpStatus: statusCodes.OK,
                body: {
                    success: true,
                    msg: respMsg.ok,
                    data: { zodiac, result }
                }
            }
        } catch (error) {
            logging.log("horoscope controller getHoroscopeHistory: ", error)
            throw new Error(error)
        }
    }

}

module.exports = new HoroscopeController();