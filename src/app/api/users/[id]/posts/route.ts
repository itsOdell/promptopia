import connectToDB from "@utils/ConnectDB"
import Prompt from "@models/prompt"
import User from "@models/User"

export async function GET(req, { params }) {
  try {
    await connectToDB()
    const userId = params.id

    const userExists = await User.findById(userId)
    if (!userExists) throw new Error("User doesn't exist")

    const prompts = await Prompt.find({
      creator: userId
    }).populate("creator")

    return new Response(JSON.stringify(prompts), { status: 200 })
  } catch (error) {
    return new Response(error.message)
  }
}
