
import React, { FC, useMemo } from "react";
import { Airdrop } from "./Airdrop";
import { Balance } from "./Balance";
import { Send } from "./Transaction";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";

// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";

import "./App.css";

function App() {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  return (
    <ConnectionProvider endpoint="https://solana-devnet.g.alchemy.com/v2/kfRU_4ZoxXTHocSBXkvM3W3dCLMReWlz">
    <WalletProvider wallets={[]} autoConnect>
      <WalletModalProvider>
        <div className="container">
          <h1>Solana Wallet DApp</h1>

          <div className="wallet-buttons">
            <WalletMultiButton />
            <WalletDisconnectButton />
          </div>

          <div className="features">
            <Airdrop />
            <Balance />
            <Send />
          </div>
        </div>
      </WalletModalProvider>
    </WalletProvider>
  </ConnectionProvider>
  );
}

export default App;
