import connectDB from '@/lib/dbConnect'
import Post from '@/models/Post'
import { generateSlug } from '@/lib/generateSlug'

export async function POST(req: Request) {
  try {
    const { title, content } = await req.json()
    await connectDB()

    if (!title && !content) {
      return new Response(
        JSON.stringify({ err: 'Please enter Title and Content.' }),
        { status: 400 }
      )
    }
    const slug = generateSlug(title)
    const postExist = await Post.findOne({ slug })

    if (postExist) {
      return new Response(
        JSON.stringify({ err: 'Post with this title already exists.' }),
        { status: 400 }
      )
    }

    const post = await Post.create({ title, content, slug })
    return new Response(JSON.stringify(post), { status: 201 })
  } catch (err) {
    return new Response(
      JSON.stringify({ err: 'Failed to create blog post.' }),
      {
        status: 500,
      }
    )
  }
}
