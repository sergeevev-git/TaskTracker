// const Token = require("../models/token");
const tokenService = require("../../services/tokenService");

exports.checkAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "unauthorized user",
            });
        }

        const accessToken = authHeader.split(" ")[1];

        if (!accessToken) {
            return res.status(401).json({
                message: "unauthorized user",
            });
        }

        const tokenData = tokenService.validateAccessToken(accessToken);

        if (!tokenData) {
            return res.status(401).json({
                message: "unauthorized user",
            });
        }

        req.user = tokenData;
        next();
    } catch (error) {
        console.log("verifyAuth error/checkAuth - ", error);
    }
};
