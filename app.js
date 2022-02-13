const express = require("express");
const path = require("path");
const config = require("config");
const cors = require("cors");
const mongoose = require("mongoose");
const chalk = require("chalk");
const cookieParser = require("cookie-parser");
const routes = require("./routes");

const app = express();
const PORT = config.get("PORT") || 5000;

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
    cors({
        credentials: true,
        origin: config.get("CLIENT_URL"),
    })
);

app.use("/api", routes);

if (process.env.NODE_ENV === "production") {
    console.log(chalk.red.inverse("production"));
} else console.log(chalk.white.inverse("development"));

async function start() {
    try {
        await mongoose.connect(config.get("DB_URI"), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(chalk.green.inverse(`Database connected...`));

        app.listen(PORT, () =>
            console.log(
                chalk.green.inverse(
                    `Server has been starter on port ${PORT}...`
                )
            )
        );
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

start();
