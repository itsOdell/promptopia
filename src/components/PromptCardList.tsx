import PromptCard from "./PromptCard"

export default function PromptCardList({ prompts, handleTagClick }) {
  return (
    <div className="mt-16 prompt_layout">
      {prompts.map(prompt => {
        return (
          <PromptCard
            key={prompt._id}
            prompt={prompt}
            handleTagClick={handleTagClick}
          />
        )
      })}
    </div>
  )
}
