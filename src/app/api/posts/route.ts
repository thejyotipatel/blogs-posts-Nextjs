import connectDB from '@/lib/dbConnect'
import Post from '@/models/Post'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    await connectDB()
    const posts = await Post.find()
    return NextResponse.json(posts)
  } catch (err) {
    console.error('Error getting posts:', err)
    return NextResponse.json(
      { error: 'Failed to get all blog posts' },
      { status: 500 }
    )
  }
}
