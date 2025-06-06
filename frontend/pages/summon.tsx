import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

interface Character {
  id: number
  name: string
  attribute: string
  motto: string
  icon: string
}

export default function Summon() {
  const [character, setCharacter] = useState<Character | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/summon')
      .then(res => res.json())
      .then(setCharacter)
  }, [])

  const startChat = () => {
    if (character) {
      router.push(`/chat?cid=${character.id}`)
    }
  }

  return (
    <div className="p-4 text-center">
      {character && (
        <div>
          <img src={character.icon} alt={character.name} className="mx-auto w-32" />
          <h1 className="text-2xl font-bold">{character.name}</h1>
          <p>{character.motto}</p>
        </div>
      )}
      <button className="mt-4 px-4 py-2 bg-green-600 text-white" onClick={startChat}>このキャラで始める</button>
    </div>
  )
}
