const { Router } = require("express");
const router = Router();

const verifyAuth = require("../middleware/auth/verifyAuth");

const usersController = require("../controllers/usersController");

router.get("/:id", verifyAuth.checkAuth, usersController.getCurrentUser);

// router.get("/allUsers", verifyAuth.checkAuth, usersController.getAllUsers);

module.exports = router;
