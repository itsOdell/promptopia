"use client"

import PromptCardList from "@components/PromptCardList"
import { useState, useEffect } from "react"
import type { ReactNode } from "react"

export default function Feed(): ReactNode {
  const [searchValue, setSearchValue] = useState<string>("")
  const [prompts, setPrompts] = useState([])

  useEffect(() => {
    async function fetchPrompts() {
      const res = await fetch("/api/prompt")
      const data = await res.json()
      setPrompts(data)
    }
    fetchPrompts()
  }, [])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
        const filteredPrompts = prompts.filter(p => p.prompt.includes(searchValue))
        setPrompts(filteredPrompts)
    }, 400)
  
    return () => clearTimeout(delayDebounceFn)
  }, [searchValue])

  function handleSearch(e) {
    e.preventDefault()
    setSearchValue(e.target.value)
  }


  return (
    <section className="feed">
      <form className="relative w-full flex_center">
        <input
          type="text"
          placeholder="Search for a hashtag or user"
          value={searchValue}
          onChange={handleSearch}
          className="search_input"
          required
        />
      </form>
      <PromptCardList prompts={prompts} />
    </section>
  )
}
