import { linksList } from "@/data/linksData";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideBar() {
  const pathname = usePathname()


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