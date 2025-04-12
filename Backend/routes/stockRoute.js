
const express = require("express");
const {getStocks, getStocksById} = require("../controllers/stockController");
const stockRoute = express.Router();
// http://localhost:8080/api/stocks/ or /:stockId
stockRoute.get("/", getStocks);
stockRoute.get("/:stockId", getStocksById);

module.exports = stockRoute;