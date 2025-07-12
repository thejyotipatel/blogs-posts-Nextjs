import { NextResponse } from 'next/server'
import connectDB from '@/lib/dbConnect'
import Post from '@/models/Post'

export async function GET(req: Request, context: { params: { slug: string } }) {
  await connectDB()

  const slug = context.params.slug

  const post = await Post.findOne({ slug })

  if (!post)
    return NextResponse.json({ error: 'Post not found' }, { status: 404 })

  return NextResponse.json({
    title: post.title,
    content: post.content,
    slug: post.slug,
    createdAt: post.createdAt,
  })
}
