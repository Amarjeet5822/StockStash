const express = require("express");
const authRoute = require("./authRoute")

const indexRoute = express.Router();  

indexRoute.use("/api/auth", authRoute);

module.exports = indexRoute;