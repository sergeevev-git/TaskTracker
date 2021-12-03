const User = require("../models/user");
const Token = require("../models/token");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const serviceToken = require("../services/tokenService");

registration = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        tokens = await serviceToken.generateTokens(newUser.id, email, username);
        await serviceToken.saveToken(newUser.id, tokens.refreshToken);
        res.cookie("refreshToken", tokens.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });
        return res.status(201).json({
            tokens,
            userId: newUser.id,
            message: "User has been created",
        });
    } catch (error) {
        console.log("authController error/registration - ", error);
    }
};

login = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email: email });

        tokens = await serviceToken.generateTokens(
            user.id,
            email,
            user.username
        );
        await serviceToken.saveToken(user.id, tokens.refreshToken);

        return res.status(200).json({
            tokens,
            userName: user.username,
            userId: user.id,
            login: true,
            message: "login successful",
        });
    } catch (error) {
        console.log("authController error/login - ", error);
    }
};

refresh = async (req, res) => {
    try {
        res.json({ message: "refresh" });
    } catch (error) {
        console.log("authController error/refresh - ", error);
    }
};

const authController = {
    registration,
    login,
    refresh,
};

module.exports = authController;
