import axios from "axios";

const API = "https://api.coingecko.com/api/v3";

export const fetchPrices = async (ids) => {
  const response = await axios.get(
    `${API}/simple/price?ids=${ids.join(",")}&vs_currencies=usd`
  );
  return response.data;
};