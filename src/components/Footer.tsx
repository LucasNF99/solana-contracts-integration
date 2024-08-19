import Link from "next/link";

export default function Footer() {
  return (
    <footer className="container sticky flex justify-end my-4 px-4">
      <p>By: <Link className="underline hover:text-blue-600" target="_blank" href="https://x.com/facholks">Facho</Link></p>
    </footer>
  )
}