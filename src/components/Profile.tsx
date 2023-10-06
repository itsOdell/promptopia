import PromptCard from "./PromptCard"

export default function Profile({
  name,
  desc,
  data,
  handleEdit,
  handleDelete
}) {
  return (
    <section className="w-full">
      <h1 className="head_text text-left blue_gradient pb-3">{name} Profile</h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-10 prompt_layout">
        {data.map(prompt => {
          return (
            <PromptCard
              key={prompt._id}
              prompt={prompt}
              handleEdit={() => handleEdit && handleEdit(prompt)}
              handleDelete={() => handleDelete && handleDelete(prompt)}
            />
          )
        })}
      </div>
    </section>
  )
}
