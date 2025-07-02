import mongoose from 'mongoose'

const PostScheme = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
)
export default mongoose.models.Post || mongoose.model('Post', PostScheme)
