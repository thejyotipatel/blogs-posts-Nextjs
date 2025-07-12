import connectDB from '@/lib/dbConnect'
import Post from '@/models/Post'
import { NextResponse } from 'next/server'
import { generateSlug } from '@/lib/generateSlug'

export async function GET() {
  await connectDB()
  const posts = await Post.find()
  return NextResponse.json(posts)
}

export async function POST(req: Request) {
  try {
    await connectDB()
    const { title, content } = await req.json()
    const slug = generateSlug(title)

    const newPost = await Post.create({ title, content, slug })

    console.log('New post created:', newPost)
    return NextResponse.json({ message: 'Post created', post: newPost })
  } catch (err) {
    console.error('Error creating post:', err)
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}
