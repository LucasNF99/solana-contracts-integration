import { IdlAccounts, Program } from "@coral-xyz/anchor";
import { CounterIdl } from "../idls/index";
import { Counter } from "../types/counter";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

const programId = new PublicKey("6Ni5YtPNjRG1Fiiq7BY59zTs6Xk2CuXFwgi6p9Zzsp25"); 

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// Initialize the program interface with the IDL, program ID, and connection.
// This setup allows us to interact with the on-chain program using the defined interface.
export const program = new Program(CounterIdl as unknown as Counter, { connection,});

// Derive a PDA for the counter account, using "counter" as the seed.
// We'll use this to update the counter on-chain.
export const [counterPDA] = PublicKey.findProgramAddressSync(
  [Buffer.from("counter")],
  program.programId
);

// Define a TypeScript type for the Counter data structure based on the IDL.
// This ensures type safety when interacting with the "counter" account, facilitating development and maintenance.
export type CounterData = IdlAccounts<Counter>["counter"];