const express = require("express");
const path = require("path");
const config = require("config");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = config.get("PORT") || 5000;

app.use(express.json({ extended: true }));
app.use(cookieParser());
app.use(
    cors({
        credentials: true,
        origin: config.get("CLIENT_URL"),
    })
);

app.use("/api/auth/", require("./routes/auth.routes"));

async function start() {
    try {
        await mongoose.connect(config.get("DB_URI"), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`));

start();
