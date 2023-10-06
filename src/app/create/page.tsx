"use client"

import Form from "@components/Form"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { FormEvent, useState } from "react"

export default function Create() {
  const router = useRouter()
  const { data: session } = useSession()
  const [post, setPost] = useState({
    prompt: "",
    hashtags: ""
  })
  const [submitting, setSubmitting] = useState(false)

  async function createPrompt(e: FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    try {
      console.log(session)
      const res = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user!.id,
          hashtags: post.hashtags
        })
      })
      if (res.ok) {
        router.push("/")
      }
    } catch (error) {
      console.error(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  )
}
