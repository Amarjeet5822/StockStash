import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchStockById } from "../RTK/features/stockSlice";

function StockDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { stock, status } = useSelector((state) => state.stocks);

  useEffect(() => {
    const fetchStockDetail = async () => {
      try {
        await dispatch(fetchStockById(id)).unwrap();
      } catch (error) {
        console.error("Failed to fetch stock detail:", error);
      }
    };
    fetchStockDetail();
  }, [dispatch, id]);

  if (status === "loading") {
    return <p className="text-center mt-10 text-blue-500 font-semibold">Loading...</p>;
  }

  if (!stock) {
    return <p className="text-center mt-10 text-gray-500">No data available</p>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-lg">
      <h2 className="text-3xl font-bold text-blue-700 mb-1">{stock.name} ({stock.symbol})</h2>
      <p className="text-gray-600 mb-6">{stock.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Detail label="Current Price" value={`$${stock.price}`} />
        <Detail
          label="Change"
          value={`${stock.change} (${stock.changePercent}%)`}
          color={stock.change >= 0 ? "text-green-600" : "text-red-600"}
        />
        <Detail label="Market Cap" value={stock.marketCap} />
        <Detail label="Volume / Avg Volume" value={`${stock.volume} / ${stock.avgVolume}`} />
        <Detail label="Today's High / Low" value={`$${stock.high} / $${stock.low}`} />
        <Detail label="Open / Previous Close" value={`$${stock.open} / $${stock.previousClose}`} />
        <Detail label="52 Week High / Low" value={`$${stock.yearHigh} / $${stock.yearLow}`} />
        <Detail label="P/E Ratio" value={stock.pe} />
        <Detail label="EPS" value={`$${stock.eps}`} />
        <Detail label="Dividend / Yield" value={`${stock.dividend} / ${stock.dividendYield}%`} />
        <Detail label="Sector" value={stock.sector} />
      </div>
    </div>
  );
}

const Detail = ({ label, value, color }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className={`text-lg font-medium ${color || "text-gray-800"}`}>{value}</p>
  </div>
);

export default StockDetail;
