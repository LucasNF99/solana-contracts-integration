import FaucetSection from "@/components/Faucet/FaucetSection"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Faucet'
}
export default function Faucet() {
  return (
    <main className="container mx-auto flex flex-1 flex-col items-center px-6">
      <h1 className='font-bold text-2xl mb-6 text-center'>Solana faucet</h1>
      <FaucetSection />
    </main>
  )
}