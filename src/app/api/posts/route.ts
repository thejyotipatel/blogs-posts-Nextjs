import { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '@/lib/dbConnect'
import Post from '@/models/Post'

export async function GET() {
  await connectDB()
  const posts = await Post.find()
  return Response.json(posts)
}

export async function POST(req: Request) {
  await connectDB()
  const { title, content, slug } = await req.json()
  const newPost = await Post.create({ title, content, slug })
  return Response.json(newPost, { status: 201 })
}
