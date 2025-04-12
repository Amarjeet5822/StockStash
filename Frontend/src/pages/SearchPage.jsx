import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function SearchPage() {
  const { stocks } = useSelector((state) => state.stocks); // Already fetched data
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [filteredStocks, setFilteredStocks] = useState([]);

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500); // delay of 500ms

    return () => clearTimeout(handler); // clear on unmount or before next run
  }, [query]);

  // Filter stocks when debouncedQuery updates
  useEffect(() => {
    if (debouncedQuery.trim() === "") {
      setFilteredStocks(stocks); // show all if no query
    } else {
      const filtered = stocks.filter(
        (stock) =>
          stock.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          stock.symbol.toLowerCase().includes(debouncedQuery.toLowerCase())
      );
      setFilteredStocks(filtered);
    }
  }, [debouncedQuery, stocks]);

  return (
    <div className="max-w-6xl mx-auto p-4 mt-8">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Search Stocks</h1>

      <input
        type="text"
        placeholder="Search by stock name or symbol..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 border-2 border-gray-200 rounded-md mb-6 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredStocks.length > 0 ? (
          filteredStocks.map((stock) => (
            <Link
              to={`/stock/${stock.id}`}
              key={stock._id}
              className="p-4 border-2 border-gray-200 rounded-md shadow hover:shadow-lg transition-all duration-200"
            >
              <h2 className="text-xl font-semibold text-primary">
                {stock.name} ({stock.symbol})
              </h2>
              <p className="text-gray-600 mt-1 line-clamp-2">{stock.description}</p>
              <p className="mt-2 text-green-600 font-bold">${stock.price}</p>
            </Link>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-400">No matching stocks found.</p>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
