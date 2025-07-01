import Post from '@/models/Post'
import dbConnect from '@/lib/dbConnect'
import { NextResponse, NextRequest } from 'next/server'

export const getPosts = async (req: NextRequest, res: NextResponse) => {
  try {
    await dbConnect()
    const posts = await Post.find().sort({ createdAt: -1 })
    res.json(posts)
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users.' })
  }
}
