import { HomeIcon, InformationCircleIcon, PaperAirplaneIcon, VariableIcon, WalletIcon } from "@heroicons/react/24/outline";
import FaucetIcon from '@/../public/assets/icons/faucet.svg';
import ThoughtIcon from '@/../public/assets/icons/thought.svg';
export const linksList = [
  {
    icon: <HomeIcon className="w-6 h-6 text-stone-900 dark:text-stone-100 group-hover:text-stone-200 group-hover:dark:text-stone-900" />,
    text: 'Home',
    link: '/'
  },
  {
    icon: <PaperAirplaneIcon className="w-6 h-6 text-stone-900 dark:text-stone-100 group-hover:text-stone-200 group-hover:dark:text-stone-900" />,
    text: 'Send Sol',
    link: '/send-sol'
  },
  {
    icon: <ThoughtIcon className="w-6 h-6 text-stone-900 dark:text-stone-100 group-hover:text-stone-200 group-hover:dark:text-stone-900 " />,
    text: 'Save thoughts',
    link: '/save-thoughts'
  },
  {
    icon: <FaucetIcon className="w-6 h-6 text-stone-900 dark:text-stone-100 group-hover:text-stone-200 group-hover:dark:text-stone-900  scale-x-[-1]" />,
    text: 'Faucet',
    link: '/faucet'
  },
  {
    icon: <VariableIcon className="w-6 h-6 text-stone-900 dark:text-stone-100 group-hover:text-stone-200 group-hover:dark:text-stone-900" />,
    text: 'Counter',
    link: '/counter'
  },
  {
    icon: <WalletIcon className="w-6 h-6 text-stone-900 dark:text-stone-100 group-hover:text-stone-200 group-hover:dark:text-stone-900" />,
    text: 'Wallet Status',
    link: '/wallet-status'
  },
  {
    icon: <InformationCircleIcon className="w-6 h-6 text-stone-900 dark:text-stone-100 group-hover:text-stone-200 group-hover:dark:text-stone-900" />,
    text: 'About',
    link: '/about'
  },
];