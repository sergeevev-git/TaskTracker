const { Router } = require("express");
const router = Router();
const User = require("../models/user");
const Token = require("../models/token");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const verifySignUp = require("../middleware/verifySingUp");
const verifySignIn = require("../middleware/verifySingIn");
const verifyRefresh = require("../middleware/verifyRefresh");
const verifyAuth = require("../middleware/verifyAuth");

const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

router.post(
    "/registration",
    verifySignUp.register,
    authController.registration
);

router.post("/login", verifySignIn.login, authController.login);

router.post("/logout", authController.logout);

router.get("/refresh", verifyRefresh.refresh, authController.refresh);

router.get("/users", verifyAuth.checkAuth, userController.getAllUsers);

module.exports = router;
