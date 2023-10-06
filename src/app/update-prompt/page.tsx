"use client"

import Form from "@components/Form"
import { useRouter, useSearchParams } from "next/navigation"
import { FormEvent, useEffect, useState } from "react"

export default function EditPrompt() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const promptId = searchParams.get("id")
  const [post, setPost] = useState({
    prompt: "",
    hashtags: ""
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    async function getPromptDetails() {
      const res = await fetch(`/api/prompt/${promptId}`)
      const { prompt, hashtags } = await res.json()
      setPost({
        prompt,
        hashtags
      })
    }

    if (promptId) getPromptDetails()
  }, [promptId])

  async function updatePrompt(e: FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
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
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  )
}
