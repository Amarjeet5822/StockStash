const express = require("express");
const authRoute = require("./authRoute");
const stockRoute = require("./stockRoute");
const isUserAuthenticated = require("../middlewares/isUserAuthenticated");
const portfolioRoute = require("./fortfolioRoute");

const indexRoute = express.Router();  

indexRoute.use("/api/auth", authRoute);
indexRoute.use("/api/stocks", stockRoute);
indexRoute.use("api/portfolio", isUserAuthenticated, portfolioRoute);

module.exports = indexRoute;