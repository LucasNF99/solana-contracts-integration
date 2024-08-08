import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'About'
}
export default function About() {

  return (
    <main className="container mx-auto flex flex-1 flex-col items-center px-6">
      <h1 className="font-bold text-2xl mb-6 text-center">About</h1>
      <p>
        Welcome to my project site! Here, I am exploring and learning the integration of Solana blockchain smart contracts with front-end development. This platform showcases my journey in connecting dApps using <i>Next.js, TypeScript and TailwindCSS</i>.
      </p>
    </main>
  );
}
