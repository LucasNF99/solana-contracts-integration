"use client";
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import * as web3 from '@solana/web3.js';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function FaucetSection() {
  const [txSig, setTxSig] = useState<String>('');
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const fundWallet = async (evt: { preventDefault: () => void }) => {
    evt.preventDefault();

    if (!publicKey || !connection) {
      toast.error('Please connect your wallet');
      throw 'Please connect your wallet';
    }

    const sender = web3.Keypair.generate();
    const balance = await connection.getBalance(sender.publicKey);
    if (balance < web3.LAMPORTS_PER_SOL) {
      await connection.requestAirdrop(sender.publicKey, web3.LAMPORTS_PER_SOL * 0.5);
    }

    const transaction = new web3.Transaction().add(
      web3.SystemProgram.transfer({
        fromPubkey: sender.publicKey,
        toPubkey: publicKey,
        lamports: web3.LAMPORTS_PER_SOL * 1
      }),
    );

    try {
      const signature = await sendTransaction(transaction, connection, {
        signers: [sender]
      });
      setTxSig(signature);
    } catch (error) {
      console.log(error)
      toast.error('Error funding wallet');
      throw error;

    } finally {

      const explorerUrl = `https://explorer.solana.com/tx/${txSig}?cluster=devnet`;
      toast.success(
        <a href={explorerUrl} className="underline" target="_blank" rel="noopener noreferrer">
          View transaction
        </a>
      );

    }
  }


  return (
    <section>
      <form onSubmit={(evt) => fundWallet(evt)}>
        <button type="submit" className='button'>Fund connected wallet</button>
      </form>
    </section>
  )
}