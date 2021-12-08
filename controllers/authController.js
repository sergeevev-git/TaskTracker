const User = require("../models/user");
const Token = require("../models/token");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const tokenService = require("../services/tokenService");
const userService = require("../services/userService");

registration = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);
        const userId = await userService.createUser(
            username,
            email,
            hashedPassword
        );

        tokens = await tokenService.generateTokens(userId, email, username);

        await tokenService.saveToken(userId, tokens.refreshToken);

        res.cookie("refreshToken", tokens.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });

        return res.status(201).json({
            accessToken: tokens.accessToken,
            userData: {
                name: user.username,
                id: user.id,
            },
            message: "User has been created",
        });
    } catch (error) {
        console.log("authController error/registration - ", error);
    }
};

login = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userService.findUserByEmail(email);

        tokens = await tokenService.generateTokens(
            user.id,
            email,
            user.username
        );
        await tokenService.saveToken(user.id, tokens.refreshToken);

        res.cookie("refreshToken", tokens.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });

        return res.status(200).json({
            accessToken: tokens.accessToken,
            userData: {
                name: user.username,
                id: user.id,
            },
            message: "login successful",
        });
    } catch (error) {
        console.log("authController error/login - ", error);
    }
};

logout = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;

        await tokenService.deleteToken(refreshToken);

        res.clearCookie("refreshToken");

        return res.status(200).json({ message: "logout successful" });
    } catch (error) {
        console.log("authController error/logout - ", error);
    }
};

refresh = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;
        const { userId } = await userService.refreshUser(refreshToken);
        const { id, email, username } = await User.findById(userId);

        tokens = await tokenService.generateTokens(id, email, username);
        await tokenService.saveToken(id, tokens.refreshToken);

        res.cookie("refreshToken", tokens.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });

        return res.status(200).json({
            accessToken: tokens.accessToken,
            userData: {
                name: username,
                id: id,
            },
            message: "refresh/re-login successful",
        });
    } catch (error) {
        console.log("authController error/refresh - ", error);
    }
};

const authController = {
    registration,
    login,
    logout,
    refresh,
};

module.exports = authController;
