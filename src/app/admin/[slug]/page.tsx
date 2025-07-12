import connectDB from '@/lib/dbConnect'
import Post from '@/models/Post'
import { notFound } from 'next/navigation'
import React from 'react'

type Props = {
  params: { slug: string }
}

export default function PostPage({ params }: Props) {
  const { slug } = params

  const post = React.useMemo(async () => {
    await connectDB()
    const post = await Post.findOne({ slug }).lean()
    return post
  }, [slug])

  if (!post) return notFound()
  console.log('Post not found:', slug)

  return (
    <div className='max-w-3xl mx-auto px-6 py-10'>
      {post.title}
      <div
        className='prose max-w-none'
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  )
}
