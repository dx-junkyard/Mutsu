import { useEffect, useState } from 'react'

interface LogItem {
  character_id: number
  text: string
}

export default function Emotion() {
  const [logs, setLogs] = useState<LogItem[]>([])

  useEffect(() => {
    fetch('/api/mylog')
      .then(res => res.json())
      .then(setLogs)
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">心の記録一覧</h1>
      <ul>
        {logs.map((l, i) => (
          <li key={i}>{l.text}</li>
        ))}
      </ul>
    </div>
  )
}
