import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl } from "@solana/web3.js";

export const NETWORK = WalletAdapterNetwork.Devnet;

// Multiple RPC endpoints for fallback
export const RPC_ENDPOINTS = [
  clusterApiUrl(NETWORK),
  "https://api.devnet.solana.com",
  "https://rpc.ankr.com/solana_devnet",
  "https://devnet.genesysgo.net",
];

export const ENDPOINT = clusterApiUrl(NETWORK);

// Fallback endpoints if main endpoint fails
export const FALLBACK_ENDPOINTS = [
  "https://api.devnet.solana.com",
  "https://devnet.genesysgo.net",
  "https://devnet.solend.fi",
];