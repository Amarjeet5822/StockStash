const express = require("express");
const { SignupMiddleware, LoginMiddleware } = require("../middlewares/authMiddleware");
const { Login, Signup } = require("../controllers/authController");

const authRoute = express.Router();
// http://localhost:8080/api/auth/signup or login
authRoute.post("/signup", SignupMiddleware , Signup);
authRoute.post("/login", LoginMiddleware , Login);

module.exports = authRoute;