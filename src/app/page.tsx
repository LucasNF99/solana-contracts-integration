
import HomeSection from '@/components/HomeSection';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
}

export default function Home() {

  return (
    <main className="container mx-auto flex flex-col items-center flex-1 px-6">
      <h1 className="font-bold text-2xl mb-6">Hello world!</h1>
      <HomeSection />
    </main>
  );
}
