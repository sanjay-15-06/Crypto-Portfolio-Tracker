import { usePortfolio } from "../context/PortfolioContext";

export default function PortfolioTable() {
  const { assets, prices, removeAsset } = usePortfolio();

  return (
    <table>
      <thead>
        <tr>
          <th>Coin</th>
          <th>Holdings</th>
          <th>Price</th>
          <th>Value</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {assets.map((asset) => {
          const price = prices[asset.coinId]?.usd || 0;
          return (
            <tr key={asset.id}>
              <td>{asset.coinId}</td>
              <td>{asset.amount}</td>
              <td>${price.toLocaleString()}</td>
              <td>${(asset.amount * price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              <td>
                <button
                  onClick={() => removeAsset(asset.id)}
                  style={{
                    background: "rgba(239, 68, 68, 0.2)",
                    color: "var(--danger)",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    fontSize: "12px",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}