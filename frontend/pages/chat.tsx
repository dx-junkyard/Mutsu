import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Chat() {
  const router = useRouter()
  const { id } = router.query
  const [input, setInput] = useState('')
  const [logs, setLogs] = useState<string[]>([])

  const send = async () => {
    if (!id) return
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ character_id: id, message: input })
    })
    const data = await res.json()
    setLogs([...logs, `You: ${input}`, data.reply])
    setInput('')
  }

  useEffect(() => {
    const saved = localStorage.getItem('chatLogs')
    if (saved) setLogs(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem('chatLogs', JSON.stringify(logs))
  }, [logs])

  return (
    <div className="p-4">
      <div className="mb-4">
        {logs.map((l, i) => <div key={i}>{l}</div>)}
      </div>
      <input value={input} onChange={e => setInput(e.target.value)} className="border" />
      <button onClick={send} className="ml-2 px-2 py-1 bg-blue-500 text-white rounded">Send</button>
    </div>
  )
}
