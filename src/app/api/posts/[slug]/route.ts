import connectDB from '@/lib/dbConnect'
import Post from '@/models/Post'
import { generateSlug } from '@/lib/generateSlug'
import { NextRequest, NextResponse } from 'next/server'

// GET BLOG POST BY TITLE/SLUG
// { params }: { params: Promise<{ slug: string[] }> },

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  try {
    await connectDB()
    // const slug = (await params).slug

    const slug = (await params).slug

    const post = await Post.findOne({ slug })

    if (!post)
      return NextResponse.json({ err: 'Blog post not found' }, { status: 404 })

    return NextResponse.json(post, { status: 200 })
  } catch {
    return NextResponse.json({ err: 'Failed to fetch post' }, { status: 500 })
  }
}

// UPDATE BLOG POST
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  try {
    const { title, content } = await req.json()
    const slug = (await params).slug

    await connectDB()

    const updatedPost = await Post.findOneAndUpdate(
      { slug },
      { title, content, slug: generateSlug(title) },
      { new: true }
    )

    if (!updatedPost)
      return new NextResponse(JSON.stringify({ err: 'Blog post not found' }), {
        status: 404,
      })

    return new NextResponse(JSON.stringify(updatedPost), { status: 200 })
  } catch {
    return new NextResponse(JSON.stringify({ err: 'Failed to update post' }), {
      status: 500,
    })
  }
}

// DELETE BLOG POST BY SLUG
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  try {
    const slug = (await params).slug
    await connectDB()

    const deletedPost = await Post.findOneAndDelete({ slug })

    if (!deletedPost)
      return new NextResponse(JSON.stringify({ err: 'Blog post not found' }), {
        status: 404,
      })

    return new NextResponse(JSON.stringify({ message: 'Blog post deleted' }), {
      status: 200,
    })
  } catch {
    return new NextResponse(
      JSON.stringify({ err: 'Failed to delete blog post' }),
      {
        status: 500,
      }
    )
  }
}
