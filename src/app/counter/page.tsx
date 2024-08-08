import CounterState from "@/components/Counter/CounterState";
import IncrementButton from "@/components/Counter/IncrementButton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Counter'
}
export default function Counter() {

  return (
    <main className="container mx-auto flex flex-1 flex-col items-center px-6">
      <h1 className="font-bold text-2xl mb-6 text-center">Solana on-chain counter</h1>
      <CounterState />
      <IncrementButton />
    </main>
  );
}
