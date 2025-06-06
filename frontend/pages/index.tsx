import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  return (
    <div className="flex items-center justify-center h-screen bg-cover" style={{backgroundImage: 'url(/images/kokoro_cover.png)'}}>
      <button className="px-4 py-2 bg-indigo-600 text-white" onClick={() => router.push('/summon')}>
        始める
      </button>
    </div>
  )
}
