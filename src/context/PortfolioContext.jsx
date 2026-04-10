import { createContext, useContext, useEffect, useState } from "react";
import { fetchPrices } from "../services/cryptoApi";

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {

  const [assets, setAssets] = useState(
    JSON.parse(localStorage.getItem("portfolio")) || []
  );

  const [prices, setPrices] = useState({});

  useEffect(() => {
    localStorage.setItem("portfolio", JSON.stringify(assets));
  }, [assets]);

  useEffect(() => {
    if (assets.length === 0) return;

    const ids = assets.map((a) => a.coinId);

    fetchPrices(ids).then(setPrices);

  }, [assets]);

  const addAsset = (asset) => {
    setAssets([...assets, asset]);
  };

  const removeAsset = (id) => {
    setAssets(assets.filter((asset) => asset.id !== id));
  };

  const portfolioValue = assets.reduce((total, asset) => {

    const price = prices[asset.coinId]?.usd || 0;

    return total + asset.amount * price;

  }, 0);

  return (
    <PortfolioContext.Provider
      value={{ assets, addAsset, removeAsset, prices, portfolioValue }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);