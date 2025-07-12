'use client'
import React, { useEffect, useState } from 'react'
import Header from '@/app/(components)/Header'
import '@/styles/components/list.css'
import {
  Delete,
  DeleteIcon,
  Edit,
  PlusCircleIcon,
  SearchIcon,
} from 'lucide-react'
import Link from 'next/link'
import PostCard from '../(components)/PostCard'

const PostList = () => {
  const [posts, setPosts] = useState<any[]>([])

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
      // console.log('Posts fetched successfully:', postsData)
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
      <div className='header-bar'>
        <Header name='Posts' />
        <Link
          href='/admin/create-post'
          className='create-btn'
          // onClick={() => setIsModelOpen(true)}
        >
          <PlusCircleIcon className='plus-icon' /> Create Post
        </Link>
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
