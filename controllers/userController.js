const User = require("../models/user");

getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        return res.status(201).json({ users });
    } catch (error) {
        console.log("userController error/getAllUsers - ", error);
    }
};

const userController = {
    getAllUsers,
};

module.exports = userController;
