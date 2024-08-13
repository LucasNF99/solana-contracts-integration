import { linksList } from "@/data/linksData";
import Link from "next/link";


export default function HomeSection() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 w-full">
      {linksList.slice(1).map((item) => (
        <Link key={item.text} href={item.link}>
          <article
            className="flex hover:dark:border-indigo-600 hover:shadow-lg items-center 
            hover:border-indigo-600 transition-all
            justify-between border-[2px] border-slate-800 
            dark:border-slate-200 p-8 rounded-lg 
            rounded-tr-none"
          >
            <p className="text-xl">{item.text}</p> {item.icon}
          </article>
        </Link>
      ))}
    </section>
  );
}
