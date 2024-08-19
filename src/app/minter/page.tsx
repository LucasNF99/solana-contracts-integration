import MinterSection from "@/components/Minter/MinterSection"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Minter'
}
export default function Minter() {
  return (
    <main className="container mx-auto flex flex-1 flex-col items-center px-6">
      <h1 className='font-bold text-2xl mb-6 text-center'>Mint your on compressed NFT!</h1>
      <MinterSection/>
    </main>
  )
}