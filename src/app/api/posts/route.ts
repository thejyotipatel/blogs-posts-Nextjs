import connectDB from '@/lib/dbConnect'
import Post from '@/models/Post'
import { NextResponse } from 'next/server'

export async function GET() {
  await connectDB()
  const posts = await Post.find()
  return NextResponse.json(posts)
}

export async function POST(req: Request) {
  await connectDB()
  const { title, content, slug } = await req.json()
  const newPost = await Post.create({ title, content, slug })
  return NextResponse.json(newPost, { status: 201 })
}
