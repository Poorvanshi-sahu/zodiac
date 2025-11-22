const express = require("express");
const { connectDatabase } = require("./config/database");
const cookieParser = require("cookie-parser");
const app = express();

// parse JSON bodies
app.use(express.json());

const auth = require("./routes/auth");
const horoscope = require("./routes/horoscope");

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

app.use("/api/v1", auth);
// app.use("/api/v1", horoscope);

const start = async () => {
    try {
        await connectDatabase();

        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port :${process.env.PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();