"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"

export default function PromptCard({
  prompt,
  handleTagClick,
  handleEdit,
  handleDelete
}) {
  const { data: session } = useSession()
  const pathname = usePathname()
  const router = useRouter()
  const [copied, setCopied] = useState("")

  function handleCopy() {
    setCopied(prompt.prompt)
    navigator.clipboard.writeText(prompt.prompt)
    setTimeout(() => setCopied(""), 3000)
  }

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex flex-1 justify-start items-center gap-3 cursor-pointer">
          <Image
            src={prompt.creator.image}
            alt="User Image"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {prompt.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {prompt.creator.email}
            </p>
          </div>
          <div className="copy_btn" onClick={handleCopy}>
            <Image
              src={
                copied === prompt.prompt
                  ? "/assets/icons/tick.svg"
                  : "/assets/icons/copy.svg"
              }
              width={20}
              height={20}
              alt="Copy Prompt Button"
            />
          </div>
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{prompt.prompt}</p>
      <span
        className="font-inter text-sm text-blue-500 cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(prompt.hashtags)}>
        #{prompt.hashtags}
      </span>
      {session?.user.id === prompt.creator._id && pathname === "/profile" && (
        <div className="mt-5 flex_center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}>
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}>
            Delete
          </p>
        </div>
      )}
    </div>
  )
}
