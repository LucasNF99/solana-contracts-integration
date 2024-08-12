'use client';
import * as web3 from '@solana/web3.js';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { toast } from 'react-toastify';

import { StudentIntro } from '../../models/serialize/StudentIntro';
import { StudentIntroCoordinator } from '../../scripts/serialize/StudentIntroCoordinator'
import { useEffect, useState } from 'react';


export default function ThoughtsSection() {
  const [name, setName] = useState('');
  const [thoughts, setThoughts] = useState('');

  const [studentIntros, setStudentIntros] = useState<StudentIntro[]>([]);
  const [page, setPage] = useState(4);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const TARGET_PROGRAM_ID = 'HdE95RSVsdb315jfJtaykXhXY478h53X6okDupVfY9yf';
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const createSubmission = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const studentIntro = new StudentIntro(name, thoughts);
    await handleTransactionSubmit(studentIntro);
  }

  const handleTransactionSubmit = async (studentIntro: StudentIntro) => {
    if (!connection || !publicKey) {
      toast.error('Please connect your wallet.');
      return;
    }

    const buffer = studentIntro.serialize();

    const transaction = new web3.Transaction();

    //Get all accounts that transaction will interact with
    const [pda, _bump] = web3.PublicKey.findProgramAddressSync(
      [publicKey.toBuffer()],
      new web3.PublicKey(TARGET_PROGRAM_ID)
    );
    // create a new `Instruction` object containing `keys`, `programId`, `buffer byte data`
    // `keys` is an array of accounts that the transaction will interact with
    // `data` is the buffer byte data
    // `programId` is the smart contract that the transaction will interact with
    const instruction = new web3.TransactionInstruction({
      keys: [
        {
          pubkey: publicKey,
          isSigner: true,
          isWritable: false
        },
        {
          pubkey: pda,
          isSigner: false,
          isWritable: true
        },
        {
          pubkey: web3.SystemProgram.programId,
          isSigner: false,
          isWritable: false
        }
      ],
      data: buffer,
      programId: new web3.PublicKey(TARGET_PROGRAM_ID)
    });

    transaction.add(instruction);


    try {
      const response = await sendTransaction(transaction, connection);
      const explorerUrl = `https://explorer.solana.com/tx/${response}?cluster=devnet`;

      toast.success(
        <a href={explorerUrl} className="underline" target="_blank" rel="noopener noreferrer">
          View transaction
        </a>
      );
    } catch (error) {
      console.log(error);
      toast.error('Error writing on blockchain');
      throw error;
    } finally {
      setName('');
      setThoughts('');
    }
  };

  useEffect(() => {
    StudentIntroCoordinator.fetchPage(
      connection,
      page,
      5,
      search,
      search !== ''
    ).then(setStudentIntros);
  }, [connection, page, search]);

  return (
    <>
      <section className='w-full'>
        <form className='flex flex-col gap-4 items-center justify-center' onSubmit={(evt) => createSubmission(evt)}>
          <label htmlFor="name" className='flex flex-col gap-2'>
            <p>Name or nickname:</p>
            <input
              required
              className='bg-transparent px-2 w-96 py-3 border border-indigo-200 hover:border-indigo-300'
              type="text"
              name="name"
              id="name"
              placeholder='Your name'
              onChange={(evt) => setName(evt.target.value)}
              value={name}
            />
          </label>
          <label htmlFor="thought" className='flex flex-col gap-2'>
            <p>Thought:</p>
            <textarea
              required
              className='bg-transparent px-2 w-96 py-3 border border-indigo-200 hover:border-indigo-300'
              name="thought"
              id="thought"
              placeholder='Your thoughts'
              onChange={(evt) => setThoughts(evt.target.value)}
              value={thoughts}
            />
          </label>
          <button className='button' type="submit">Save thought</button>
        </form>
      </section>
      <section className='border border-slate-800 dark:border-stone-200 w-full mt-6 p-6'>
        <div className='flex justify-between items-start'>
          <h2 className='font-bold text-center mb-3'>
            Read some thoughts:
          </h2>
          <div>
            <label htmlFor="Search" className='flex gap-2 items-center'>
              <input
                required
                className='bg-transparent px-2 py-3 border border-indigo-200 hover:border-indigo-300'
                type="search"
                name="Search"
                id="Search"
                placeholder='Search'
                onChange={(evt) => setSearchInput(evt.target.value)}
                value={searchInput}
              />
              <button onClick={() => setSearch(searchInput)} className='button' type="button">Search</button>
            </label>
          </div>
        </div>
        <div>
          <ul className='flex flex-col divide-y divide-slate-800 dark:divide-slate-200 max-h-[500px] overflow-y-auto'>
            {studentIntros.map((studentInto: StudentIntro, index: number) => (
              (studentInto.name && studentInto.message) &&
              <li
                key={`${studentInto.name}-${index}`}
                className=' py-4'
              >
                <p>
                  <strong>Name:</strong> <span>{studentInto.name}</span>
                </p>
                <p>
                  <strong>Thought:</strong> <span>{studentInto.message}</span>
                </p>
              </li>
            ))}
          </ul>
          <div className='flex justify-between mt-4'>
            {page > 1 &&
              <button onClick={() => setPage(page - 1)} className='button' type="button">Previous</button>}
            {StudentIntroCoordinator.accounts.length > page * 5 &&
              <button
                onClick={() => setPage(page + 1)}
                className='button'
                disabled={studentIntros.length === 0}
                type="button">
                Next
              </button>}
          </div>
        </div>
      </section>
    </>
  );
}