import axios from "axios";

const ALCHEMY_ETH = "https://eth-mainnet.g.alchemy.com/v2/gDDp74H5nTN63ySIDKoLY";
const ALCHEMY_SOL = "https://solana-mainnet.g.alchemy.com/v2/gDDp74H5nTN63ySIDKoLY";


// 🟣 Ethereum balance
export async function getEthBalance(address) {
  try {
    const res = await axios.post(ALCHEMY_ETH, {
      jsonrpc: "2.0",
      method: "eth_getBalance",
      params: [address, "latest"],
      id: 1,
    });

    const wei = parseInt(res.data.result, 16);
    return (wei / 1e18).toFixed(6);
  } catch (err) {
    console.error("ETH balance error:", err);
    return "Error";
  }
}


// 🟢 Solana balance
export async function getSolBalance(address) {
  try {
    const res = await axios.post(ALCHEMY_SOL, {
      jsonrpc: "2.0",
      id: 1,
      method: "getBalance",
      params: [address],
    });

    return (res.data.result.value / 1e9).toFixed(6);
  } catch (err) {
    console.error("SOL balance error:", err);
    return "Error";
  }
}






