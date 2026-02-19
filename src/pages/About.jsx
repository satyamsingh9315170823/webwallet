export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-5xl font-bold text-white mb-6">About Web3 Wallets</h1>

      <p className="text-zinc-400 leading-relaxed mb-6">
        Web3 Wallets is a learning project that demonstrates how HD wallets
        work internally using modern crypto libraries.
      </p>

      <ul className="space-y-3 text-zinc-400">
        <li>• HD wallet generation (BIP39)</li>
        <li>• Ethereum + Solana support</li>
        <li>• Private keys never leave browser</li>
        <li>• Built with React + Tailwind</li>
      </ul>
    </div>
  );
}
