import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <Image src="/images/second_cover.png" alt="cover" width={400} height={300} />
      <Link href="/summon" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Enter</Link>
    </div>
  )
}
