const express = require("express");
const authRoute = require("./authRoute");
const stockRoute = require("./stockRoute");

const indexRoute = express.Router();  

indexRoute.use("/api/auth", authRoute);
indexRoute.use("/api/stocks", stockRoute);
module.exports = indexRoute;