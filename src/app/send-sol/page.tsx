import { SendSolSection } from "@/components/SendSol/SendSolSection"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Send SOL'
}
export default function SendSol() {
  return (
    <main className="container mx-auto flex flex-1 flex-col items-center px-6">
      <h1 className='font-bold text-2xl mb-6 text-center'>Send Solana</h1>
      <SendSolSection />
    </main>
  )
}