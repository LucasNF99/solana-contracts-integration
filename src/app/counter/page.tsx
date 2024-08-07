import CounterState from "@/components/Counter/CounterState";
import IncrementButton from "@/components/Counter/IncrementButton";

export default function Counter() {

  return (
    <main className="container mx-auto flex flex-1 flex-col items-center">
      <h1 className="font-bold text-2xl">Solana on-chain counter</h1>
      <CounterState />
      <IncrementButton />
    </main>
  );
}
