const Stock = require("../models/stock.model");
const AppError = require("../utils/AppError");

const getStocks = async (req, res, next) => {
  try {
    const stocks = await Stock.find();

    if (stocks.length === 0) {
      return res.status(404).json({ message: "No Data Found" });
    }
    console.log("total stocks : ",stocks.length)
    res.status(200).json(stocks);
  } catch (error) {
    next(new AppError(500, error.message || "Failed to fetch stocks"));
  }
};

const getStocksById = async (req, res, next) => {
  const { stockId } = req.params;
  try {
    const stock = await Stock.findOne({_id: stockId });
    if(! stock) {
      return next(new AppError(404, "No data Found"))
    }
    res.status(200).json(stock);
  } catch (error) {
    next(new AppError(500, error.message || "Failed to fetch stock"))
  }
};

module.exports = { getStocks, getStocksById };
