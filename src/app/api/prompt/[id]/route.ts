import Prompt from "@models/prompt"
import connectToDB from "@utils/ConnectDB"

export const GET = async (req, { params }) => {
  try {
    await connectToDB()
    const prompt = await Prompt.findById(params.id).populate("creator")
    if (!prompt) throw new Error("Prompt doesn't exist")
    return new Response(JSON.stringify(prompt), { status: 200 })
  } catch (error) {
    return new Response(error.message, { status: 500 })
  }
}

export const PATCH = async (req, { params }) => {
  try {
    const { prompt, hashtags } = await req.json()
    await connectToDB()
    const promptDocument = await Prompt.findById(params.id).populate("creator")
    if (!prompt) throw new Error("Prompt doesn't exist")
    ;(promptDocument.prompt = prompt), (promptDocument.hashtags = hashtags)
    await promptDocument.save()
    return new Response(JSON.stringify(promptDocument), { status: 200 })
  } catch (error) {
    return new Response(error.message, { status: 200 })
  }
}

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB()
    const prompt = await Prompt.findByIdAndDelete(params.id)
    return new Response("Prompt deleted successfully", { status: 200 })
  } catch (error) {
    return new Response(error.message, { status: 500 })
  }
}
