import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { theme } from "./theme";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./state/cart";
import menuReducer from "./state/menu";
import userReducer from "./state/user";
import SetUserFromCookie from "./utils/SetUserFromCookie";
import GetItems from "./utils/GetItems";

const store = configureStore({
  reducer: { cart: cartReducer, menu: menuReducer, user: userReducer },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SetUserFromCookie />
        <GetItems />
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
