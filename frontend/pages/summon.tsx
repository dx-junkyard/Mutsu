import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

export default function Summon() {
  const [second, setSecond] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    fetch('http://localhost:8000/summon')
      .then(res => res.json())
      .then(setSecond)
  }, [])

  if (!second) return <div>Loading...</div>

  const select = () => {
    router.push({ pathname: '/chat', query: { id: second.id } })
  }

  return (
    <div className="p-4 text-center">
      <h1 className="text-xl mb-4">Summoned Second</h1>
      <Image src={second.icon} alt={second.name} width={100} height={100} />
      <p>{second.name}</p>
      <button onClick={select} className="mt-2 px-3 py-1 bg-green-500 text-white rounded">Choose</button>
    </div>
  )
}
