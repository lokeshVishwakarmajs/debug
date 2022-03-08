const express = require("express");
const app = express();
const logger = require("morgan");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

app.use(logger("dev"));

app.use(cors())

app.use(
    express.json({
        limit: "50mb"
    })
);

app.use(
    express.urlencoded({
        limit: "50mb",
        extended: true
    })
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.use("/api", require("./api"));

app.use((req, res, next) => {
    const error = new Error(`404_Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
});

app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        isError: true,
        msg: err.message,
        errorCode: statusCode,
        success: false
    });
});

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
    console.log(`Server: ListeningOn Port: ${PORT} And ${
      process.env.TEST_ENV ? "ENV variables fetch successfully!" : "can't get ENV variables"}`
    );
});
