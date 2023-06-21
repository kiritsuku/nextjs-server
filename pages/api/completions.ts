import { NextApiRequest, NextApiResponse } from "next";

const host = "localhost"
const port = 3020

export interface CompletionDto {
  completions: string[]
}

async function getCompletions(term: string): Promise<CompletionDto> {
  const res = await fetch(`http://${host}:${port}/completions?` + new URLSearchParams({term: term}));
  return res.json()
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<CompletionDto>) {
    const q = req.query.term as string
    console.log(`term: ${q}`)
    try {
        const completions = await getCompletions(q)
        console.log(`completions: ${completions.completions}`)
        res.status(200).json(completions)
    } catch (e) {
        console.error(e)
        res.status(500).json({ completions: []})
    }
}