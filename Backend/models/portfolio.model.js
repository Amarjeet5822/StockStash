const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    stock: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stock", // assuming you already have a Stock model
      required: true,
    },
    shares: {
      type: Number,
      required: true,
      min: [0, "Shares can't be negative"],
    },
    avgPrice: {
      type: Number,
      required: true,
      min: [0, "Price can't be negative"],
    },
  },
  {
    timestamps: true,
  }
);

const Portfolio = mongoose.model("Portfolio", portfolioSchema);
module.exports = Portfolio;
