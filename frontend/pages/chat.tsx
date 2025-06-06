import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

interface Message {
  text: string
  from: 'user' | 'ai'
}

export default function Chat() {
  const router = useRouter()
  const { cid } = router.query
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [log, setLog] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem('chat-' + cid)
    if (stored) {
      setMessages(JSON.parse(stored))
    }
  }, [cid])

  useEffect(() => {
    localStorage.setItem('chat-' + cid, JSON.stringify(messages))
  }, [messages, cid])

  const send = async () => {
    if (!input) return
    setMessages([...messages, { text: input, from: 'user' }])
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_input: input, character_id: Number(cid) })
    })
    const data = await res.json()
    setMessages(m => [...m, { text: data.response, from: 'ai' }])
    setInput('')
  }

  const saveLog = async () => {
    await fetch('/api/mylog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ character_id: Number(cid), text: log })
    })
    setLog('')
  }

  return (
    <div className="p-4">
      <div className="h-96 overflow-y-auto border p-2 mb-4">
        {messages.map((m, i) => (
          <div key={i} className={m.from === 'user' ? 'text-right' : ''}>
            <span className={m.from === 'user' ? 'text-blue-600' : 'text-green-600'}>{m.text}</span>
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <input className="flex-1 border" value={input} onChange={e => setInput(e.target.value)} />
        <button className="px-4 py-2 bg-blue-600 text-white" onClick={send}>送信</button>
      </div>
      <div className="mt-4">
        <textarea className="w-full border" rows={3} placeholder="心の記録" value={log} onChange={e => setLog(e.target.value)} />
        <button className="mt-2 px-2 py-1 bg-purple-600 text-white" onClick={saveLog}>記録保存</button>
      </div>
    </div>
  )
}
