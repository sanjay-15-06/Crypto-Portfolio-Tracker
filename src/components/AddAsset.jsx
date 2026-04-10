import { useState } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { v4 as uuidv4 } from "uuid";

export default function AddAsset() {

  const { addAsset } = usePortfolio();

  const [coinId, setCoinId] = useState("bitcoin");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    addAsset({
      id: uuidv4(),
      coinId,
      amount: parseFloat(amount),
    });

    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit} className="form">

      <select value={coinId} onChange={(e) => setCoinId(e.target.value)}>
        <option value="bitcoin">Bitcoin</option>
        <option value="ethereum">Ethereum</option>
        <option value="solana">Solana</option>
        <option value="dogecoin">Dogecoin</option>
      </select>

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button>Add Asset</button>

    </form>
  );
}