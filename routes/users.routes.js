const { Router } = require("express");
const router = Router();

const verifyAuth = require("../middleware/auth/verifyAuth");

const userController = require("../controllers/userController");

router.get("/allUsers", verifyAuth.checkAuth, userController.getAllUsers);

module.exports = router;
