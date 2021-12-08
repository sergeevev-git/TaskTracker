const User = require("../models/user");
const tokenService = require("../services/tokenService");

exports.createUser = async (username, email, password) => {
    const newUser = new User({
        username,
        email,
        password,
    });

    await newUser.save();

    return newUser.id;
};

exports.findUserByEmail = async (email) => {
    const user = await User.findOne({ email: email });

    return user;
};

exports.refreshUser = async (refreshToken) => {
    const tokenData = tokenService.validateRefreshToken(refreshToken);

    return tokenData;
};
