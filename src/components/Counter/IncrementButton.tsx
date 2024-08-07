"use client";
import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { program } from "@/program/anchor/setup";
import { toast } from 'react-toastify';

export default function IncrementButton() {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    if (!publicKey) return;

    setIsLoading(true);

    try {
      // Create a transaction to invoke the increment function 
      const transaction = await program.methods
        .increment() // This takes no arguments so we don't need to pass anything
        .transaction();

      const transactionSignature = await sendTransaction(
        transaction,
        connection
      );

      const explorerUrl = `https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`;

      toast.success(
        <a href={explorerUrl} className="underline" target="_blank" rel="noopener noreferrer">
          View transaction
        </a>
      );

    } catch (error) {
      console.log(error);
      toast.error(`${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className="button"
      onClick={onClick}
      disabled={!publicKey || isLoading}
    >
      {isLoading ? "Loading..." : "Increment"}
    </button>
  );
}
