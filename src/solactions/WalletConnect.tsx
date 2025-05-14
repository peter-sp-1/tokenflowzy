import * as React from "react";
import { createContext, useContext, useMemo, ReactNode } from "react";
import {
  ConnectionProvider,
  WalletProvider,
  useWallet as useSolanaWallet,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";

interface WalletContextProviderProps {
  children: ReactNode;
}

const WalletContextProvider: React.FC<WalletContextProviderProps> = ({ children }) => {
  // Set network to Devnet
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // Initialize wallet adapter
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter({ network }),
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export const CustomWalletMultiButton = () => {
  const wallet = useSolanaWallet();

  return (
    <WalletMultiButton 
      style={{
        ...connectButtonStyles,
        boxShadow: wallet.connected ? '0 0 10px rgba(147, 51, 234, 0.5)' : 'none'
      }}
    >
      {wallet.connected ? '' : 'Connect'}
    </WalletMultiButton>
  );
};

const connectButtonStyles: React.CSSProperties = {
  backgroundColor: "black",
  color: "#fff",
  padding: "0.75rem 1.5rem",
  border: "1px solid rgba(147, 51, 234, 0.5)",
  borderRadius: "8px",
  fontSize: "0.875rem",
  cursor: "pointer",
  transition: "all 0.3s ease",
  outline: "none",
};

export const useWallet = useSolanaWallet;
export default WalletContextProvider;
