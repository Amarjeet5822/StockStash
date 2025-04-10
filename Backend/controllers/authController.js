const AppError = require("../utils/AppError");
const dotenv = require("dotenv");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
dotenv.config();

const Login = async (req, res, next) => {
  const { email } = req.body;
  try {
    const matchingUser = await User.findOne({ email }).select("-password");
    const refreshToken = jwt.sign(
      { userId: matchingUser._id, user: matchingUser.name },
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, // Prevents XSS attacks
      secure: process.env.NODE_ENV === "production", // `false` in development, `true` in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax", // `Strict` can block requests in some cases, `Lax` is better for authentication
      maxAge: 7 * 24 * 60 * 60 * 1000, // Seven Days
    });
    res
      .status(200)
      .json({ message: "Login Successfull!", user: matchingUser });
  } catch (error) {
    next(new AppError(500, error.message));
  }
};
const Signup = async (req, res, next) => {
  const { name, password, email } = req.body;
  try {
    // throw new Error("Error in try block");
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = new User({ name, email, password: hash });
    await newUser.save();
    res.status(201).json({ message: "You have been successfully regitered!" });
  } catch (error) {
    next(new AppError(500, error.message));
  }
};

module.exports = { Login, Signup };