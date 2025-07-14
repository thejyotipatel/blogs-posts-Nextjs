'use client'
import React, { useEffect, useState } from 'react'
import Header from '@/app/(components)/Header'
import '@/styles/components/list.css'
import { SearchIcon } from 'lucide-react'
import Link from 'next/link'
import PostCard from '../(components)/PostCard'

const Post = () => {
  const [posts, setPosts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const stripHtmlTags = (html: string) => {
    return html.replace(/<[^>]+>/g, '')
  }

  const getData = async () => {
    setIsLoading(true)
    fetch('/api/posts').then(async (res) => {
      if (!res.ok) throw new Error('Failed to fetch posts')

      const data = await res.json()

      if (!data || data.length === 0)
        return <h1 className='custom-heading'>No posts found</h1>

      const postsData = data.reduce((acc: any[], post: any) => {
        acc.push({
          ...post,
          content: stripHtmlTags(post.content),
        })
        return acc
      }, [])
      setPosts(postsData)
      setIsLoading(false)
    })
  }

  useEffect(() => {
    getData()
  }, [])

  if (isLoading) return <h1>Blog posts are Loading...</h1>

  return (
    <div className='products-container'>
      {/* SEARCH BAR */}
      <div className='search-wrapper'>
        <div className='search-bar'>
          <SearchIcon className='search-icon' />
          <input className='search-input' placeholder='Search blog post...' />
        </div>
      </div>
      <div className='header-wrapper'>
        <Header name='All the Blog Posts' />
        <p className='blog-count'>{posts.length} posts</p>
      </div>
      {/* BODY OF LIST of POSTS */}
      <div className='grid-layout'>
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  )
}
export default Post
