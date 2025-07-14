'use client'
import connectDB from '@/lib/dbConnect'
import Post from '@/models/Post'
import { notFound } from 'next/navigation'
import * as React from 'react'
import { useEffect, useState } from 'react'
type Props = {
  params: { slug: string }
}

export default function PostPage({ params }: Props) {
  const [isPost, setIsPost] = useState<any>([])
  const stripHtmlTags = (html: string) => {
    return html.replace(/<[^>]+>/g, '')
  }
  const post = React.useMemo(async () => {
    const { slug } = params
    await connectDB()
    const post = await Post.findOne({ slug }).lean()
    console.log('Post not found:', post)
    return post
  }, [])

  if (!post) return notFound()

  useEffect(() => {
    setIsPost(post)
  }, [])

  return (
    <div className='max-w-3xl mx-auto px-6 py-10'>
      {isPost.title}
      <div className='prose max-w-none'>{stripHtmlTags(isPost.content)}</div>
    </div>
  )
}
