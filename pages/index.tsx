import { Button, IconButton, InputBase, Paper, Stack, TextField, TextareaAutosize } from "@mui/material"
import { NextPage } from "next"
import React from "react"
import { CompletionDto } from "./api/completions"
import { Search } from "@mui/icons-material"

async function getCompletions(term: string): Promise<CompletionDto> {
    if (term === "")
      return { "completions": [] }
    const res = await fetch("/api/completions?" + new URLSearchParams({term: term}))
    return res.json()
}

const Home: NextPage = () => {
  const [term, setTerm] = React.useState("")
  const [searchResults, setSearchResults] = React.useState("")
  const displayCompletions = (term: string) => {
    const completions = getCompletions(term)
    completions
      .then(dto => {
        console.log(`completions: ${dto.completions}`)
        setSearchResults(dto.completions.join("\n"))
      })
      .catch(e => console.error(e))
  }
  const onClick = () => displayCompletions(term)

  return (
    <main>
        <Stack direction="row" spacing={2}>
            <TextField label="search term" onChange={e => {
              setTerm(e.target.value)
              displayCompletions(e.target.value)
            }} />
            <IconButton type="button" onClick={onClick}>
              <Search />
            </IconButton>
        </Stack>
        <TextareaAutosize value={searchResults} />
    </main>
  )
}

export default Home
