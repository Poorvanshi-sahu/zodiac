const express = require("express");
const { connectDatabase } = require("./config/database");
const cookieParser = require("cookie-parser");
const app = express();

// parse JSON bodies
app.use(express.json());

const auth = require("./routes/auth");
const horoscope = require("./routes/horoscope");

app.use(express.json({ limit: "5mb" }));
app.use(cookieParser(process.env.JWT_SECRET));

app.use("/api/v1/user", auth);
app.use("/api/v1/horoscope", horoscope);

app.use((err, req, res, next) => {
    console.error(err);

    return res.status(err.statusCode || 500).json({
        success: false,
        msg: err.message || "Internal Server Error",
        data: {}
    });
});

const start = async () => {
    try {
        await connectDatabase();

        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port: ${process.env.PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();

