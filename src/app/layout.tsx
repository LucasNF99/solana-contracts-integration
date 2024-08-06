"use client";
import { Space_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  WalletModalProvider
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import React, { useMemo } from "react";
import "./globals.css";
import '@solana/wallet-adapter-react-ui/styles.css';
import Header from "@/components/Header";
import { RecoilRoot } from "recoil";

const space_mono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"]
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(
    () => [

    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
  );
  return (
    <html lang="en">
      <RecoilRoot>
        <ThemeProvider enableSystem={true} attribute="class">
          <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
              <WalletModalProvider>
                <body className={space_mono.className}>
                  <Header />
                  {children}
                </body>
              </WalletModalProvider>
            </WalletProvider>
          </ConnectionProvider>
        </ThemeProvider>
      </RecoilRoot>
    </html>
  );
}
