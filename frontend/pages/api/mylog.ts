import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const backend = process.env.BACKEND_URL || 'http://localhost:8000'

  if (req.method === 'POST') {
    const result = await axios.post(`${backend}/mylog`, req.body)
    return res.status(200).json(result.data)
  }

  if (req.method === 'GET') {
    const result = await axios.get(`${backend}/mylog`)
    return res.status(200).json(result.data)
  }

  return res.status(405).end()
}
