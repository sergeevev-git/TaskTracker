const jwt = require("jsonwebtoken");
const config = require("config");
const Token = require("../models/token");

exports.generateTokens = async (id, email, username) => {
    const accessToken = jwt.sign(
        { userId: id, email: email, userName: username },
        config.get("JWT_ACCESS_SECRET"),
        { expiresIn: "3600" }
    );

    const refreshToken = jwt.sign(
        { userId: id, email: email, userName: username },
        config.get("JWT_REFRESH_SECRET"),
        { expiresIn: "30d" }
    );

    return { accessToken, refreshToken };
};

exports.saveToken = async (id, refreshToken) => {
    const tokenData = await Token.findOne({ user: id });

    if (tokenData) {
        tokenData.refreshToken = refreshToken;
        return await tokenData.save();
    } else {
        const token = await Token.create({ user: id, refreshToken });
        return token;
    }
};
