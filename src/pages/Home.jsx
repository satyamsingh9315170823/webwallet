import { useState } from "react";
import { generateAllWallets } from "../utils/wallet";
import { getEthBalance, getSolBalance } from "../utils/balance";
import { SiEthereum, SiSolana } from "react-icons/si";

export default function Home() {
  const [showSeed, setShowSeed] = useState(false);
  const [loadingIndex, setLoadingIndex] = useState(null);
  const [seedCopied, setSeedCopied] = useState(false);

  const [wallets, setWallets] = useState(() => {
    const saved = localStorage.getItem("wallets");
    return saved ? JSON.parse(saved) : [];
  });

  const [mnemonic, setMnemonic] = useState(() => {
    return localStorage.getItem("mnemonic") || "";
  });

  const copySeed = async () => {
    await navigator.clipboard.writeText(mnemonic);
    setSeedCopied(true);
    setTimeout(() => setSeedCopied(false), 2000);
  };

  const generateWallet = async () => {
    const data = await generateAllWallets();
    setWallets(data.wallets);
    setMnemonic(data.mnemonic);
  };

  const fetchBalance = async (wallet, index) => {
    setLoadingIndex(index);
    let balance = "";

    if (wallet.chain === "Ethereum")
      balance = await getEthBalance(wallet.address);

    if (wallet.chain === "Solana")
      balance = await getSolBalance(wallet.address);

    const updated = [...wallets];
    updated[index].balance = balance;
    setWallets(updated);
    setLoadingIndex(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-6">

      {/* HERO SECTION */}
      <section className="py-24 relative">
        <div className="absolute -top-16 -left-16 w-72 h-72 bg-zinc-700/20 blur-3xl rounded-full"></div>

        <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
          Generate Web3 Wallets <br />
          <span className="text-zinc-400 text-4xl font-medium">
            Ethereum & Solana
          </span>
        </h1>

        <p className="text-zinc-400 mb-10 max-w-xl text-lg leading-relaxed">
          Securely generate HD wallets directly in your browser.
          Your private keys never leave your device.
        </p>

        <button
          onClick={generateWallet}
          className="px-8 py-4 bg-white text-black rounded-2xl font-semibold 
                     hover:scale-105 hover:shadow-xl transition duration-300"
        >
          Generate Wallet
        </button>
      </section>

      {/* SEED PHRASE */}
     {mnemonic && (
  <div className="bg-zinc-900 p-5 sm:p-8 rounded-3xl border border-zinc-800 mb-20 shadow-xl">

    {/* Header */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          Secret Recovery Phrase
        </h2>
        <p className="text-zinc-500 text-sm mt-1 max-w-md">
          Write these words down in order. Anyone with this phrase can access your wallet.
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setShowSeed(!showSeed)}
          className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-md text-xs font-medium transition"
        >
          {showSeed ? "Hide" : "Show"}
        </button>

        <button
          onClick={copySeed}
          className="px-3 py-1.5 bg-white text-black hover:bg-zinc-200 rounded-md text-xs font-medium transition"
        >
          {seedCopied ? "Copied ✓" : "Copy"}
        </button>
      </div>
    </div>

    {/* WORD GRID */}
    <div className="
      mx-auto grid 
      grid-cols-2 sm:grid-cols-3 md:grid-cols-4 
      gap-2 sm:gap-4
      max-w-xl sm:max-w-3xl
    ">
      {mnemonic.split(" ").map((word, i) => (
        <div
          key={i}
          className={`flex items-center gap-2
                      bg-black hover:bg-zinc-900
                      px-3 py-3 sm:px-4 sm:py-4
                      rounded-lg border border-zinc-800
                      text-sm sm:text-base font-semibold
                      transition duration-200
                      ${!showSeed && "blur-sm select-none"}`}
        >
          {/* Number badge */}
          <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center
                          rounded bg-zinc-800 text-zinc-400 text-[10px] sm:text-xs">
            {i + 1}
          </div>

          {/* Word */}
          <span className="text-zinc-100 truncate">
            {word}
          </span>
        </div>
      ))}
    </div>

  </div>
)}


      {/* WALLET CARDS */}
      <div className="grid md:grid-cols-2 gap-8 pb-24">
        {wallets.map((w, i) => (
          <div
            key={i}
            className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 
                       hover:border-zinc-600 hover:scale-[1.02] 
                       transition duration-300"
          >
            {/* Chain Header */}
            <div className="flex items-center gap-3 mb-4">
              {w.chain === "Ethereum" && (
                <SiEthereum className="text-purple-400" size={24} />
              )}
              {w.chain === "Solana" && (
                <SiSolana className="text-green-400" size={24} />
              )}
              <h3 className="text-2xl text-white font-semibold">
                {w.chain}
              </h3>
            </div>

            {/* Address */}
            <p className="text-zinc-400 text-xs mb-1">Address</p>
            <p className="break-all font-mono text-sm mb-6">
              {w.address}
            </p>

            {/* Balance */}
            <div className="flex justify-between items-center">
              <div>
                <p className="text-zinc-400 text-xs">Balance</p>
                <p className="text-white text-lg font-semibold">
                  {w.balance ?? "Not fetched"}
                </p>
              </div>

              <button
                onClick={() => fetchBalance(w, i)}
                disabled={loadingIndex === i}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 
                           rounded-lg text-sm transition 
                           disabled:opacity-50"
              >
                {loadingIndex === i ? "Loading..." : "Get Balance"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
