import React, { useEffect } from "react";
import { getUserStatus } from "../RTK/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchStocks } from "../RTK/features/stockSlice";
import { useNavigate } from "react-router-dom";

function IndexPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { stocks: mockStocks, status } = useSelector((state) => state.stocks);

  useEffect(() => {
    const fetchUserStatus = async () => {
      try {
        await dispatch(getUserStatus()).unwrap();
      } catch (error) {}
    };
    fetchUserStatus();
  }, []);

  useEffect(() => {
    const fetchstocks = async () => {
      try {
        await dispatch(fetchStocks()).unwrap();
      } catch (error) {}
    };
    fetchstocks();
  }, []);
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 text-gray-900">
      {/* 1. Hero Section */}
      <section className="bg-white py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Start Your Investment Journey
          </h1>
          <p className="text-lg mb-6">
            Discover trending stocks, explore the market, and make informed
            investment decisions.
          </p>
          <img
            src="https://img.freepik.com/free-vector/investment-data-illustration_52683-36122.jpg"
            alt="Investment Illustration"
            className="mx-auto max-w-md rounded-lg shadow-md"
          />
        </div>
      </section>

      {/* 2. Market Overview */}
      <section className="py-16 px-6 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            📊 Market Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockStocks.slice(0, 3).map((stock) => (
              <div
                onClick={() => navigate(`/stock/${stock._id}`)}
                key={stock._id}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer"
              >
                <h3 className="text-xl font-bold mb-2">
                  {stock.name} ({stock.symbol})
                </h3>
                <p className="text-sm mb-1">Price: ${stock.price.toFixed(2)}</p>
                <p
                  className={`text-sm mb-1 ${
                    stock.change >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  Change: {stock.change >= 0 ? "+" : ""}
                  {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                </p>
                <p className="text-sm">Market Cap: {stock.marketCap}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Trending Stocks */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            🔥 Trending Stocks
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockStocks.slice(0, 6).map((stock) => (
              <div
                onClick={() => navigate(`/stock/${stock._id}`)}
                key={stock._id}
                className="bg-white p-6 rounded-xl shadow hover:shadow-md transition cursor-pointer"
              >
                <h3 className="text-xl font-bold">{stock.name}</h3>
                <p className="text-sm mb-2">{stock.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm font-semibold text-gray-600">
                    Price: ${stock.price}
                  </span>
                  <span
                    className={`text-sm font-semibold ${
                      stock.change >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stock.change >= 0 ? "+" : ""}
                    {stock.change.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Get Started Section */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Invest?
          </h2>
          <p className="mb-6 text-lg">
            Join Stock Stash and make your money work for you!
          </p>
          <button 
          onClick={() => navigate("/search")}
          className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-lg shadow hover:bg-gray-100">
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
}

export default IndexPage;
