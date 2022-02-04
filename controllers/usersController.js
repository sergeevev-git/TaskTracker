const User = require("../models/user");
const usersService = require("../services/usersService");

getCurrentUser = async (req, res) => {
    try {
        const { userId } = req.query;
        const user = await usersService.findUserById(userId);
        console.log("user", user);
        return res.status(201).json({
            username: user.username,
            id: user._id,
        });
    } catch (error) {
        console.log("userController error/getCurrentUser - ", error);
    }
};

// getAllUsers = async (req, res) => {
//     try {
//         const users = await User.find();

//         return res.status(201).json({ users });
//     } catch (error) {
//         console.log("userController error/getAllUsers - ", error);
//     }
// };

const usersController = {
    getCurrentUser,
    // getAllUsers,
};

module.exports = usersController;
