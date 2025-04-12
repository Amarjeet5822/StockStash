import React from "react";
import { useSelector } from "react-redux";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Mock holdings
const holdings = [
  { symbol: "AAPL", shares: 25, avgPrice: 165.32 },
  { symbol: "MSFT", shares: 12, avgPrice: 380.45 },
  { symbol: "GOOGL", shares: 15, avgPrice: 132.21 },
  { symbol: "AMZN", shares: 18, avgPrice: 168.74 },
  { symbol: "TSLA", shares: 10, avgPrice: 185.65 },
  { symbol: "META", shares: 6, avgPrice: 435.5 },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a4de6c", "#8dd1e1"];

const cashBalance = 5321.78;

function Portfolio() {
  const { stocks = [] } = useSelector((state) => state.stocks || {});

  const portfolioDetails = holdings
    .map((holding) => {
      const stock = stocks.find((s) => s.symbol === holding.symbol);
      if (!stock || stock.currentPrice == null) return null;

      const { currentPrice } = stock;
      const value = currentPrice * holding.shares;
      const returnAmount = (currentPrice - holding.avgPrice) * holding.shares;
      const returnPercent = holding.avgPrice
        ? ((currentPrice - holding.avgPrice) / holding.avgPrice) * 100
        : 0;

      return {
        ...holding,
        currentPrice,
        value,
        returnAmount,
        returnPercent,
      };
    })
    .filter(Boolean);

  const totalPortfolioValue = portfolioDetails.reduce((acc, cur) => acc + cur.value, 0);
  const totalReturn = portfolioDetails.reduce((acc, cur) => acc + cur.returnAmount, 0);

  const pieChartData = portfolioDetails.map((stock) => ({
    name: stock.symbol,
    value: +stock.value.toFixed(2),
  }));

  return (
    <div className="px-4 md:px-12 py-10 bg-gray-50 min-h-screen text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Your Portfolio</h1>
      <p className="text-sm text-gray-500 mb-8">Track and manage your investments</p>

      {/* Top Cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-10">
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-500">Total Portfolio Value</p>
          <h2 className="text-2xl font-bold text-gray-900">${(totalPortfolioValue + cashBalance).toFixed(2)}</h2>
          <p className="text-sm text-green-500 mt-1">Updated live</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-500">Cash Balance</p>
          <h2 className="text-2xl font-bold text-gray-900">${cashBalance.toLocaleString()}</h2>
          <p className="text-sm text-gray-400 mt-1">Available for trading</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-500">Total Return</p>
          <h2 className={`text-2xl font-bold ${totalReturn >= 0 ? "text-green-600" : "text-red-500"}`}>
            {totalReturn >= 0 ? "+" : "-"}${Math.abs(totalReturn).toFixed(2)}
          </h2>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-white p-6 rounded-lg shadow mb-10">
        <h2 className="text-lg font-semibold mb-4">Portfolio Allocation</h2>
        {pieChartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${entry.name}-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500">No data available for pie chart.</p>
        )}
      </div>

      {/* Table */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Portfolio Analysis</h2>
        {portfolioDetails.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-sm">
              <thead>
                <tr className="border-b bg-gray-100 text-gray-600">
                  <th className="px-4 py-3 text-left">Symbol</th>
                  <th className="px-4 py-3 text-center">Shares</th>
                  <th className="px-4 py-3 text-center">Avg. Price</th>
                  <th className="px-4 py-3 text-center">Current Price</th>
                  <th className="px-4 py-3 text-center">Value</th>
                  <th className="px-4 py-3 text-center">Return</th>
                </tr>
              </thead>
              <tbody>
                {portfolioDetails.map((stock, i) => {
                  const isPositive = stock.returnAmount >= 0;
                  return (
                    <tr key={stock.symbol} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-3">{stock.symbol}</td>
                      <td className="px-4 py-3 text-center">{stock.shares}</td>
                      <td className="px-4 py-3 text-center">${stock.avgPrice.toFixed(2)}</td>
                      <td className="px-4 py-3 text-center">${stock.currentPrice.toFixed(2)}</td>
                      <td className="px-4 py-3 text-center">${stock.value.toFixed(2)}</td>
                      <td
                        className={`px-4 py-3 text-center font-medium ${
                          isPositive ? "text-green-600" : "text-red-500"
                        }`}
                      >
                        {isPositive ? "+" : "-"}${Math.abs(stock.returnAmount).toFixed(2)} (
                        {isPositive ? "+" : "-"}{Math.abs(stock.returnPercent).toFixed(2)}%)
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No holdings found.</p>
        )}
        <div className="mt-6 text-center">
          <button className="text-indigo-600 hover:underline font-medium">
            Find New Stocks
          </button>
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
