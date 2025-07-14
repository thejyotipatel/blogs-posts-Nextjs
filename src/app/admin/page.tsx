'use client'
import '@/styles/components/list.css'
import React, { useEffect, useState } from 'react'
import { isAdmin } from '@/lib/isAdmin'
import Header from '@/app/(components)/Header'
import PostCard from '../(components)/PostCard'
import { PlusCircleIcon, SearchIcon } from 'lucide-react'

const PostList = () => {
  const [posts, setPosts] = useState<any[]>([])
  const admin = isAdmin()

  const stripHtmlTags = (html: string) => {
    return html.replace(/<[^>]+>/g, '')
  }

  const getData = async () => {
    fetch('/api/posts').then(async (res) => {
      if (!res.ok) throw new Error('Failed to fetch posts')

      const data = await res.json()

      if (!data || data.length === 0) {
        console.log('No posts found')
        return
      }

      const postsData = data.reduce((acc: any[], post: any) => {
        acc.push({
          ...post,
          content: stripHtmlTags(post.content),
        })
        return acc
      }, [])
      setPosts(postsData)
    })
  }
  const handleSubmit = async () => {}
  useEffect(() => {
    getData()
  }, [])
  return (
    <div className='products-container'>
      {/* SEARCH BAR */}
      <div className='search-wrapper'>
        <div className='search-bar'>
          <SearchIcon className='search-icon' />
          <input className='search-input' placeholder='Search products...' />
        </div>
      </div>
      {/* HEADER BAR   */}

      <div className='header-wrapper'>
        <Header name='Blog Posts' />
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
export default PostList
