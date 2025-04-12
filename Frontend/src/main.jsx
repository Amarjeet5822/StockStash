import { createRoot } from "react-dom/client";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import App from "./App.jsx";
import {
  DashboardPage,
  ErrorPage,
  IndexPage,
  LoginPage,
  Portfolio,
  RegisterPage,
  SearchPage,
  StockDetail,
  TradePage,
} from "./pages/indexPages.js";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./RTK/store/store.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <IndexPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/search", element: <SearchPage /> },
      { path: "/stock/:symbol", element: <StockDetail /> },
      { path: "/portfolio", element: <Portfolio /> },
      { path: "/trade", element: <TradePage /> },
      { path: "/dashboard", element: <DashboardPage /> },
      
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
