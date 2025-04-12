const express = require('express');
const { getUserPortfolio, sellStock, buyStock } = require('../controllers/portfolioController');


const portfolioRoute = express.Router();

portfolioRoute.get("/", getUserPortfolio);
portfolioRoute.post("/sell", sellStock)
portfolioRoute.post("/buy", buyStock)

module.exports = portfolioRoute;