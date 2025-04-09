// middlewares/authMiddleware.mjs

const AppError = require("../utils/AppError");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next(); // user is logged in
  }
  next(new AppError("Not authenticated", 401))
};

const comparePass = async (user, password) => {
  try {
    const isPasswordMatching = bcrypt.compareSync(password, user.password); // true
  return isPasswordMatching
  } catch (error) {
    return false
  }
}

const LoginMiddleware = async (req, res, next) => {
  const {email, password} = req.body;
  // logic to trim password and email 
  if(!email?.trim() || !password?.trim()) {
    return next(new AppError(400, "Invalid Credential"))
  }
  let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if(!regex.test(email)){
    return next(new AppError(400,"Invalid email! Please enter correct valid email" ))
  }
  try {
    const user = await User.findOne({email});
  if(!user){
    return next(new AppError(404, "User not Found! Please register First"));
  }
  if (comparePass(user, password)){
    next();
  }else{ 
    return next(new AppError(400, "Invalid credential!"));
  }
  } catch (error) {
    next(new AppError(400, error.message));
  }
};

module.exports = {isAuthenticated, LoginMiddleware};