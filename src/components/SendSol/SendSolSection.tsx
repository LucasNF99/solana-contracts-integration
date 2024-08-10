'use client';
import * as web3 from '@solana/web3.js';
import { toast } from 'react-toastify';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { FormEvent, useEffect, useState } from 'react';


export function SendSolSection() {
  const [account, setAccount] = useState<web3.PublicKey>();
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [txSig, setTxSig] = useState('');


  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const handleTransaction = async (evt: FormEvent) => {
    evt.preventDefault();
    if (!connection || !publicKey) {
      toast.error('Please connect your wallet.');
      return;
    }
    if (!account) {
      toast.error('Account is not defined.');
      return;
    }

    const transaction = new web3.Transaction();
    const instruction = web3.SystemProgram.transfer({
      fromPubkey: publicKey,
      lamports: amount * web3.LAMPORTS_PER_SOL,
      toPubkey: account,
    });

    transaction.add(instruction);

    try {
      const signature = await sendTransaction(transaction, connection);
      setTxSig(signature);

      const newBalance = balance - amount;
      setBalance(newBalance);

      const explorerUrl = `https://explorer.solana.com/tx/${signature}?cluster=devnet`;
      toast.success(
        <a href={explorerUrl} className="underline" target="_blank" rel="noopener noreferrer">
          View transaction
        </a>
      );

      // Limpa os inputs após a transação ser enviada com sucesso
      setAccount(undefined);
      setAmount(0);

    } catch (error) {
      console.log(error);
      toast.error('Transaction failed!');
    };
  };

  useEffect(() => {
    const getInfo = async () => {
      if (connection && publicKey) {
        const info = await connection.getAccountInfo(publicKey);
        setBalance(info!.lamports / web3.LAMPORTS_PER_SOL);
      }
    };
    getInfo();
  }, [connection, publicKey]);

  return (
    <section>
      <form className='flex flex-col gap-4 items-center justify-center' onSubmit={(evt) => handleTransaction(evt)}>
        <label htmlFor="receiver" className='flex flex-col'>
          <p>Address of receiver</p>
          <input
            required
            className='bg-transparent px-2 py-3 border border-indigo-200 hover:border-indigo-300'
            type="text"
            name="receiver"
            id="receiver"
            placeholder='Enter address'
            onChange={(evt) => setAccount(new web3.PublicKey(evt.target.value))}
            value={account ? account.toString() : ''}
          />
        </label>

        <label htmlFor="amount" className='flex flex-col'>
          <p>Amount</p>
          <input
            required
            className='bg-transparent px-2 py-3 border border-indigo-200 hover:border-indigo-300'
            type="number"
            name="amount"
            min={0}
            step='any'
            id="amount"
            placeholder='Entre amount'
            onChange={(evt) => setAmount(Number(evt.target.value))}
            value={amount}
          />
        </label>

        <button disabled={!account || !amount} className='button mx-auto' type="submit">Send</button>
      </form>
    </section>
  );
}


