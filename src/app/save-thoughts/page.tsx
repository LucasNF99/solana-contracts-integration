
import ThoughtsSection from "@/components/Thoughts/ThoughtsSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Save Thoughts'
}
export default function SaveThoughts() {

  return (
    <main className="container mx-auto flex flex-1 flex-col items-center px-6">
      <h1 className='font-bold text-2xl mb-6 text-center'>
        Save any thought {' '}
        <strong className="underline decoration-dotted">on-chain</strong>
      </h1>
      <ThoughtsSection />
    </main>
  );
}