import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

export const fetchPortfolio = createAsyncThunk(
  "portfolio/fetchPortfolio",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/portfolio", { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch portfolio"
      );
    }
  }
);

export const asyncBuyStock = createAsyncThunk(
  "portfolio/asyncBuyStock",
  async (stockData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/portfolio/buy", stockData, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to buy stock");
    }
  }
);

export const asyncSellStock = createAsyncThunk(
  "portfolio/asyncSellStock",
  async (stockData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/portfolio/sell", stockData, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to sell stock");
    }
  }
);

const initialState = {
  portfolio: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    buyStock: (state, action) => {
      const { stockId, quantity, price } = action.payload;
      const existingStock = state.portfolio.find(
        (stock) => stock.stockId === stockId
      );

      if (existingStock) {
        existingStock.quantity += quantity;
        existingStock.totalCost += quantity * price;
      } else {
        state.portfolio.push({
          stockId,
          quantity,
          totalCost: quantity * price,
        });
      }
    },
    sellStock: (state, action) => {
      const { stockId, quantity, price } = action.payload;
      const existingStock = state.portfolio.find(
        (stock) => stock.stockId === stockId
      );

      if (existingStock) {
        if (existingStock.quantity >= quantity) {
          existingStock.quantity -= quantity;
          existingStock.totalCost -= quantity * price;

          if (existingStock.quantity === 0) {
            state.portfolio = state.portfolio.filter(
              (stock) => stock.stockId !== stockId
            );
          }
        } else {
          state.error = "Insufficient stock quantity to sell";
        }
      } else {
        state.error = "Stock not found in portfolio";
      }
    },
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.status = "loading";
      state.error = null;
    };

    const handleRejected = (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    };

    builder
      .addCase(fetchPortfolio.pending, handlePending)
      .addCase(fetchPortfolio.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.portfolio = action.payload;
      })
      .addCase(fetchPortfolio.rejected, handleRejected);
    builder
      .addCase(asyncBuyStock.pending, handlePending)
      .addCase(asyncBuyStock.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { stockId, quantity, price } = action.payload;
        const existingStock = state.portfolio.find(
          (stock) => stock.stockId === stockId
        );

        if (existingStock) {
          existingStock.quantity += quantity;
          existingStock.totalCost += quantity * price;
        } else {
          state.portfolio.push({
            stockId,
            quantity,
            totalCost: quantity * price,
          });
        }
      })
      .addCase(asyncBuyStock.rejected, handleRejected);
    builder
      .addCase(asyncSellStock.pending, handlePending)
      .addCase(asyncSellStock.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { stockId, quantity, price } = action.payload;
        const existingStock = state.portfolio.find(
          (stock) => stock.stockId === stockId
        );

        if (existingStock) {
          if (existingStock.quantity >= quantity) {
            existingStock.quantity -= quantity;
            existingStock.totalCost -= quantity * price;

            if (existingStock.quantity === 0) {
              state.portfolio = state.portfolio.filter(
                (stock) => stock.stockId !== stockId
              );
            }
          } else {
            state.error = "Insufficient stock quantity to sell";
          }
        } else {
          state.error = "Stock not found in portfolio";
        }
      })
      .addCase(asyncSellStock.rejected, handleRejected);
  },
});

export const { buyStock, sellStock, resetError } = portfolioSlice.actions;

export default portfolioSlice.reducer;
