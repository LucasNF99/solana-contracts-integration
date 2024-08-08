import WalletInfo from "@/components/WalletStatus/WalletInfo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Wallet Status'
}
export default function Wallets() {

  return (
    <main className="container mx-auto flex flex-1 flex-col items-center px-6">
      <h1 className='font-bold text-2xl mb-6 text-center'>Wallet status and balance</h1>
      <WalletInfo />
    </main>
  );
}