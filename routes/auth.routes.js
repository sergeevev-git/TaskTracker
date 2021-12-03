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

const authController = require("../controllers/authController");

router.post(
    "/registration",
    verifySignUp.register,
    authController.registration
);

router.post("/login", verifySignIn.login, authController.login);

router.get("/refresh", authController.refresh);

module.exports = router;
