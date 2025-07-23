import connectDB from '@/lib/dbConnect'
import Post from '@/models/Post'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    await connectDB()

    const { searchParams } = new URL(req.url)
    const query = searchParams.get('q')

    let posts
    if (query && query.trim() !== '') {
      posts = await Post.find({
        $or: [{ slug: { $regex: query, $options: 'i' } }],
      }).sort({ createdAt: -1 })
    } else {
      posts = await Post.find().sort({ createdAt: -1 })
    }
    return NextResponse.json(posts, { status: 200 })
  } catch (err) {
    console.error('Error getting posts:', err)
    return NextResponse.json(
      { err: 'Failed to get blog posts' },
      { status: 500 }
    )
  }
}
