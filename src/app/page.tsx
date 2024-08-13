
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
}

export default function Home() {

  return (
    <main className="container mx-auto flex flex-col items-center flex-1">
      <h1 className="font-bold text-2xl">Hello world!</h1>
    </main>
  );
}
