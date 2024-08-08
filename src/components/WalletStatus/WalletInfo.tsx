"use client";
import * as web3 from '@solana/web3.js';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';

export default function WalletInfo() {
  const [balance, setBalance] = useState(0);
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  useEffect(() => {
    const getInfo = async () => {
      if (connection && publicKey) {
        const walletInfo = await connection.getAccountInfo(publicKey);
        setBalance(walletInfo!.lamports / web3.LAMPORTS_PER_SOL);
      }
    };
    getInfo();
  }, [connection, publicKey]);


  return (
    <section>
      <p>
        <strong>Is connected: </strong>
        <span className={`underline ${publicKey ? 'decoration-green-600' : 'decoration-red-600'}`}>
          {publicKey ? 'Yes' : 'No'}
        </span>
      </p>
      <p>
        <strong>Balance:</strong> <span>{publicKey ? balance.toFixed(2) : '00'}</span> SOL
      </p>
    </section>
  )
}