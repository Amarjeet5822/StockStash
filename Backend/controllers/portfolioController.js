const Portfolio = require("../models/portfolio.model");
const AppError = require("../utils/AppError");

const buyStock = async (req, res) => {
  try {
    const { stockId, shares, pricePerShare } = req.body;
    const { userId } = req.user;

    const existing = await Portfolio.findOne({ user: userId, stock: stockId });

    if (existing) {
      // Update avg price
      const totalShares = existing.shares + shares;
      const totalCost = (existing.avgPrice * existing.shares) + (pricePerShare * shares);
      existing.avgPrice = totalCost / totalShares;
      existing.shares = totalShares;
      await existing.save();
    } else {
      await Portfolio.create({
        user: userId,
        stock: stockId,
        shares,
        avgPrice: pricePerShare,
      });
    }

    res.status(200).json({ message: "Stock bought successfully!" });
  } catch (err) {
    next(new AppError(500, err.message));
  }
};

const sellStock = async (req, res) => {
  try {
    const { stockId, shares } = req.body;
    const { userId } = req.user;

    const existing = await Portfolio.findOne({ user: userId, stock: stockId });

    if (!existing || existing.shares < shares) {
      next(new AppError(400, "Not enough shares to sell"));
      return;
    }

    existing.shares -= shares;

    if (existing.shares === 0) {
      await existing.remove();
    } else {
      await existing.save();
    }

    res.status(200).json({ message: "Stock sold successfully!" });
  } catch (err) {
    next(new AppError(500, err.message));
  }
};

const getUserPortfolio = async (req, res) => {
  try {
    const { userId } = req.user;
    // 1. Fetch all portfolio entries for this user
    const portfolio = await Portfolio.find({ user: userId }).populate("stock");

    // 2. Map and enrich with value & return info
    const result = portfolio.map((entry) => {
      const currentPrice = entry.stock.currentPrice;
      const value = entry.shares * currentPrice;
      const returnAmount = (currentPrice - entry.avgPrice) * entry.shares;
      const returnPercent = ((currentPrice - entry.avgPrice) / entry.avgPrice) * 100;

      return {
        stockId: entry.stock._id,
        symbol: entry.stock.symbol,
        company: entry.stock.company,
        currentPrice,
        shares: entry.shares,
        avgPrice: entry.avgPrice,
        value: +value.toFixed(2),
        returnAmount: +returnAmount.toFixed(2),
        returnPercent: +returnPercent.toFixed(2),
      };
    });

    res.status(200).json({ portfolio: result });
  } catch (error) {
    console.error("Error fetching portfolio:", error.message);
    res.status(500).json({ message: "Server error while fetching portfolio" });
  }
};

module.exports = { buyStock, sellStock, getUserPortfolio };