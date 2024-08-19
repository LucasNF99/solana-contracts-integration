import { Metadata } from "next";
import GitHubIcon from '@/../public/assets/icons/github-mark.svg';
import Link from "next/link";
export const metadata: Metadata = {
  title: 'About'
}
export default function About() {

  return (
    <main className="container mx-auto flex flex-1 flex-col items-center px-6">
      <h1 className="font-bold text-2xl mb-6 text-center">About</h1>
      <section>
        <p>
          Welcome to my project site! Here, I am exploring and learning the integration of Solana blockchain smart contracts with front-end development. This platform showcases my journey in connecting dApps using <i>Next.js, TypeScript and TailwindCSS</i>.
        </p>
        <p className="flex justify-end">
          <Link
            href="https://github.com/LucasNF99/solana-contracts-integration"
            target="_blank"
            className="flex underline items-center gap-2 transition-all hover:text-blue-600"
          >
            Source code here!<GitHubIcon className="w-5 h-5" />
          </Link>
        </p>
      </section>
    </main>
  );
}
