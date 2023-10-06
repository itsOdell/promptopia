import mongoose from "mongoose"

const PromptSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required"]
  },
  hashtags: {
    type: String
  }
})

const PromptModel =
  mongoose.models.Prompt || mongoose.model("Prompt", PromptSchema)
export default PromptModel
