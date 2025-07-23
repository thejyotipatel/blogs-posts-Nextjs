import connectDB from '@/lib/dbConnect'
import Post from '@/models/Post'
import { generateSlug } from '@/lib/generateSlug'

// GET BLOG POST BY TITLE/SLUG
export async function GET(context: { params: { slug: string } }) {
  try {
    await connectDB()
    console.log('get one')

    const { slug } = await context.params

    const post = await Post.findOne({ slug })

    if (!post)
      return new Response(JSON.stringify({ err: 'Blog post not found' }), {
        status: 404,
      })

    return new Response(JSON.stringify(post), { status: 200 })
  } catch {
    return new Response(JSON.stringify({ err: 'Failed to fetch post' }), {
      status: 500,
    })
  }
}

// UPDATE BLOG POST
export async function PUT(req: Request, context: { params: { slug: string } }) {
  try {
    const { title, content } = await req.json()
    const { slug } = await context.params

    await connectDB()
    console.log('update', slug)

    const updatedPost = await Post.findOneAndUpdate(
      { slug },
      { title, content, slug: generateSlug(title) },
      { new: true }
    )

    if (!updatedPost)
      return new Response(JSON.stringify({ err: 'Blog post not found' }), {
        status: 404,
      })

    return new Response(JSON.stringify(updatedPost), { status: 200 })
  } catch {
    return new Response(JSON.stringify({ err: 'Failed to update post' }), {
      status: 500,
    })
  }
}

// DELETE BLOG POST BY SLUG
export async function DELETE(
  req: Request,
  context: { params: { slug: string } }
) {
  try {
    const { slug } = await context.params

    await connectDB()

    const deletedPost = await Post.findOneAndDelete({ slug })

    if (!deletedPost)
      return new Response(JSON.stringify({ err: 'Blog post not found' }), {
        status: 404,
      })

    return new Response(JSON.stringify({ message: 'Blog post deleted' }), {
      status: 200,
    })
  } catch {
    return new Response(JSON.stringify({ err: 'Failed to delete blog post' }), {
      status: 500,
    })
  }
}
