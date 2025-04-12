import { configureStore } from "@reduxjs/toolkit";
import authUserReducer from "../features/authSlice";
import loggerMiddleware from "../middleware/loggerMiddleware";
import stocksReducer from "../features/stockSlice";

export const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    stocks: stocksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
 })
