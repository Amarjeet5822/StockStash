import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../store/links";

// Async thunk to fetch all stocks
export const fetchStocks = createAsyncThunk(
  "stocks/fetchStocks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${api}/api/stocks`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk to fetch a stock by ID with error handling
export const fetchStockById = createAsyncThunk(
  "stocks/fetchStockById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${api}/api/stocks/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


const stockSlice = createSlice({
  name: "stocks",
  initialState: {
    stocks: [],
    stock: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.status = "loading";
      state.error = null;
    };
    
    const handleRejected = (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    };
    // get the Stocks
    builder
      .addCase(fetchStocks.pending, handlePending)
      .addCase(fetchStocks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.stocks = action.payload;
      })
      .addCase(fetchStocks.rejected, handleRejected);
    // get the Stock by ID
    builder
      .addCase(fetchStockById.pending, handlePending)
      .addCase(fetchStockById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.stock = action.payload;
      })
      .addCase(fetchStockById.rejected, handleRejected);
  },
});

export default stockSlice.reducer;
