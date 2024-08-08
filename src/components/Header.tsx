import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import DarkModeBtn from "./DarkModeButton";

export default function Header() {
  return (
    <header className="container mx-auto sticky flex justify-end items-center py-4 px-4 border-b border-stone-900 dark:border-stone-100 mb-6">

      <div className="flex items-center justify-center gap-2">
        <WalletMultiButton />
        <DarkModeBtn />
      </div>
    </header>
  )
}