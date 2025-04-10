import { configureStore } from "@reduxjs/toolkit"
import authUserReducer from "../features/authSlice"
import loggerMiddleware from "../middleware/loggerMiddleware"

export const store = configureStore({
  reducer: {
    authUser: authUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
 })
