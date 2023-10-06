import connectToDB from "@utils/ConnectDB"
import Prompt from "@models/prompt"

export async function POST(req) {
  const { userId, prompt, hashtags } = await req.json()
  try {
    await connectToDB()
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      hashtags
    })

    await newPrompt.save()

    return new Response(JSON.stringify(newPrompt), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response("Failed to create a new prompt", { status: 500 })
  }
}
