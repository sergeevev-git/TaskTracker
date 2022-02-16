const { Router } = require("express");
const router = Router();

const verifyAuth = require("../middleware/auth/verifyAuth");

const usersController = require("../controllers/usersController");

router.get("/", verifyAuth.checkAuth, usersController.getCurrentUser);

router.get("/all", verifyAuth.checkAuth, usersController.getAllUsers);

module.exports = router;
