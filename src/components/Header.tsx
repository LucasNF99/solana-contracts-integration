import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import DarkModeBtn from "./DarkModeButton";

export default function Header() {
  return (
    <header className="sticky flex justify-around items-center my-4">
      <span>Profile</span>
      <WalletMultiButton />
      <DarkModeBtn />
    </header>
  )
}