import { HomeIcon, InformationCircleIcon, PaperAirplaneIcon, VariableIcon, WalletIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import FaucetIcon from '@/../public/assets/icons/faucet.svg';
export default function SideBar() {
  const pathname = usePathname()
  const linksList = [
    {
      icon: <HomeIcon className="w-5 h-5 text-stone-900 dark:text-stone-100 group-hover:text-stone-200 group-hover:dark:text-stone-900" />,
      text: 'Home',
      link: '/'
    },
    {
      icon: <FaucetIcon className="w-6 h-6 text-stone-900 dark:text-stone-100 group-hover:text-stone-200 group-hover:dark:text-stone-900  scale-x-[-1]" />,
      text: 'Faucet',
      link: '/faucet'
    },
    {
      icon: <PaperAirplaneIcon className="w-5 h-5 text-stone-900 dark:text-stone-100 group-hover:text-stone-200 group-hover:dark:text-stone-900" />,
      text: 'Send Sol',
      link: '/send-sol'
    },
    {
      icon: <VariableIcon className="w-5 h-5 text-stone-900 dark:text-stone-100 group-hover:text-stone-200 group-hover:dark:text-stone-900" />,
      text: 'Counter',
      link: '/counter'
    },
    {
      icon: <WalletIcon className="w-5 h-5 text-stone-900 dark:text-stone-100 group-hover:text-stone-200 group-hover:dark:text-stone-900" />,
      text: 'Wallet Status',
      link: '/wallet-status'
    },
    {
      icon: <InformationCircleIcon className="w-5 h-5 text-stone-900 dark:text-stone-100 group-hover:text-stone-200 group-hover:dark:text-stone-900" />,
      text: 'About',
      link: '/about'
    },
  ];

  return (
    <aside className="border-r border-stone-900 dark:border-stone-100 px-6">
      <ul className="mt-6 text-lg flex flex-col gap-4">
        {linksList.map((item) => (
          <li key={item.link}>
            <Link
              className={`
              flex
              items-center
              gap-2  
              px-2
              py-2
              transition-all
              bg-stone-200
              dark:bg-stone-900
              border-stone-900 
              dark:border-stone-100
              hover:bg-stone-900
              hover:text-stone-200
              hover:dark:bg-stone-200
              hover:dark:text-stone-900
              group
              ${pathname === item.link ? 'outline-dashed outline-2 outline-indigo-500' : ''}
               `}
              href={item.link}
            >
              <span>{item.icon}</span>{item.text}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}