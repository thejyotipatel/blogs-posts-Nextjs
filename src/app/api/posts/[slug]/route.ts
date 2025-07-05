import connectDB from '@/lib/dbConnect'
import Post from '@/models/Post'
import { NextResponse } from 'next/server'

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  await connectDB()
  const post = await Post.findOne({ slug: params.slug })
  if (!post)
    return NextResponse.json({ error: 'Post not found' }, { status: 404 })

  return NextResponse.json(post)
}
