import Feed from "@components/Feed"
import type { ReactNode } from "react"

export default function Home(): ReactNode {
  return (
    <section className="flex_center w-full flex-col">
      <header className="head_text font-bold text-center">
        <h1 className="">Discover & Share</h1>
        {/* <br className="max-md:hidden" /> */}
        <h3 className="orange_gradient">AI-Powered Prompts</h3>
        <p className="desc font-normal">
          Promptopia is an open-source AI prompting tool for modern world to
          discover, create and share creative prompts.
        </p>
      </header>
      <Feed />
    </section>
  )
}
