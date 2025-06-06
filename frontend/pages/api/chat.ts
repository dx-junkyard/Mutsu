import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()
  const backend = process.env.BACKEND_URL || 'http://localhost:8000'
  const result = await axios.post(`${backend}/chat`, req.body)
  res.status(200).json(result.data)
}
