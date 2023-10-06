"use client"
import Link from "next/link"

export default function Form({
  type,
  post,
  setPost,
  submitting,
  handleSubmit
}) {
  return (
    <section className="w-full">
      <h1 className=" head_text text-left blue_gradient ">{type} post</h1>
      <p className="desc max-w-md">
        {type} and share amazing prompts with the world and let your imagination
        run wild with Promptopia
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphosim">
        <div>
          <label
            htmlFor="prompt"
            className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </label>
          <textarea
            name="prompt"
            id="prompt"
            value={post.prompt}
            onChange={e => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your prompt here"
            required
            className="form_textarea"
          />
        </div>
        <div>
          <label
            htmlFor="hashtags"
            className="font-satoshi font-semibold text-base text-gray-700">
            Prompt Hashtags
          </label>
          <input
            name="hashtags"
            id="hashtags"
            value={post.hashtags}
            onChange={e => setPost({ ...post, hashtags: e.target.value })}
            placeholder="Example #idea #product #trending etc..."
            className="form_input"
          />
        </div>
        <div className="flex_end  gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm blue_gradient_bg text-white rounded-lg">
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  )
}
