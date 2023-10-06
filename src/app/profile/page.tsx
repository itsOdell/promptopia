"use client"

import ProfileComponent from "@components/Profile"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import type { ReactNode } from "react"

export default function Profile(): ReactNode {
  const router = useRouter()
  const [prompts, setPrompts] = useState([])
  const { data: session } = useSession()

  useEffect(() => {
    console.log(session)
    async function fetchPrompts() {
      const res = await fetch(`/api/users/${session?.user.id}/posts`)
      const data = await res.json()
      setPrompts(data)
    }

    session?.user.id && fetchPrompts()
  })

  function handleEdit(prompt) {
    router.push(`/update-prompt?id=${prompt._id}`)
  }

  async function handleDelete(prompt) {
    if (confirm("Are you sure? ")) {
      await fetch(`/api/prompt/${prompt._id}`, {
        method: "DELETE"
      })
      const filteredPrompts = prompts.filter(p => p._id !== prompt._id)
      setPrompts(filteredPrompts)
    }
  }

  return (
    <ProfileComponent
      name="My"
      desc="Welcome to your profile"
      data={prompts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}
