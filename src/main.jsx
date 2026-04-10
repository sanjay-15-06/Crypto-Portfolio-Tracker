import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { PortfolioProvider } from "./context/PortfolioContext";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <PortfolioProvider>
    <App />
  </PortfolioProvider>
);