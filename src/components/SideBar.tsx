import Link from "next/link";

export default function SideBar() {
  const linksList = [
    {
      icon: '',
      text: 'Home',
      link: '/'
    },
    {
      icon: '',
      text: 'Counter',
      link: '/counter'
    },
    {
      icon: '',
      text: 'About',
      link: '/about'
    },
  ];

  return (
    <aside className="border-r border-stone-900 dark:border-stone-100 px-6">
      <ul className="mt-6 text-lg flex flex-col gap-2 items-center">
        {linksList.map((item) => (
          <li key={item.link}>
            <Link
              className="  
              px-2
              transition-all
              bg-stone-200
              dark:bg-stone-900
              border-stone-900 
              dark:border-stone-100
              hover:bg-stone-900
              hover:text-stone-200
              hover:dark:bg-stone-200
              hover:dark:text-stone-900"
              href={item.link}
            >
              {item.text}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}