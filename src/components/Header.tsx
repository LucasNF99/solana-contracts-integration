import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import DarkModeBtn from "./DarkModeButton";

export default function Header() {
  return (
    <header className="container mx-auto sticky flex justify-between items-center my-4 px-4">
      <span>Profile</span>
      <div className="flex items-center justify-center gap-2">
        <WalletMultiButton />
        <DarkModeBtn />
      </div>
    </header>
  )
}