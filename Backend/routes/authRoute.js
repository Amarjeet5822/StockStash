const express = require("express");

const router = express.Router();

router.post("/signup", SignupMiddleware , Signup);
router.post("/login", LoginMiddleware , Login);
router.post("/logout", Logout);	

module.exports = router;