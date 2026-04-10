import { usePortfolio } from "../context/PortfolioContext";

export default function PortfolioSummary() {

  const { portfolioValue } = usePortfolio();

  return (
    <div className="summary">

      <h2>Total Portfolio Value</h2>

      <h1>${portfolioValue.toFixed(2)}</h1>

    </div>
  );
}