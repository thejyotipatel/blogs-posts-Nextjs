'use client'

import { useAppContext } from '@/app/context'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import '@/styles/components/post.css'

const SingleBlogPost = () => {
  const { slug } = useParams()

  const { stripHtmlTags, getOnePost, post, isLoading } = useAppContext()

  useEffect(() => {
    if (typeof slug === 'string') {
      getOnePost(slug)
    }
  }, [])

  if (isLoading || !post) return <p>Loading...</p>

  return (
    <div className='post-wrapper'>
      <div className='post-header'>
        <h1 className='post-title'>{post.title}</h1>
      </div>
      <p className='post-slug'>
        <span className='post-slug-header'>Slug: </span>
        {post.slug}
      </p>
      <br />
      <p className='post-desc'>{stripHtmlTags(post.content)}</p>
    </div>
  )
}
export default SingleBlogPost
