import { Buffer } from "buffer";
import { ethers } from "ethers";
import { Keypair } from "@solana/web3.js";




export function generateMnemonic() {
  return ethers.utils.entropyToMnemonic(
    ethers.utils.randomBytes(16)
  );
}



export function createEthereumWallet(mnemonic) {
  const hdNode = ethers.utils.HDNode.fromMnemonic(mnemonic);
  const wallet = hdNode.derivePath("m/44'/60'/0'/0/0");

  return {
    chain: "Ethereum",
    address: wallet.address,
  };
}



export async function createSolanaWallet(mnemonic) {
  const seedHex = await ethers.utils.mnemonicToSeed(mnemonic);

  // remove 0x and convert hex → bytes
  const seedBuffer = Buffer.from(seedHex.slice(2), "hex");

  // take first 32 bytes
  const seed32 = Uint8Array.from(seedBuffer.slice(0, 32));

  const keypair = Keypair.fromSeed(seed32);

  return {
    chain: "Solana",
    address: keypair.publicKey.toBase58(),
  };
}



export async function generateAllWallets() {
  const mnemonic = generateMnemonic();

  const eth = createEthereumWallet(mnemonic);
  const sol = await createSolanaWallet(mnemonic);


  const wallets = [eth, sol];

  localStorage.setItem("wallets", JSON.stringify(wallets));
  localStorage.setItem("mnemonic", mnemonic);

  return { mnemonic, wallets };
}

