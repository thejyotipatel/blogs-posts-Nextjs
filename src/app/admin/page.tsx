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
      console.log('Posts fetched successfully:', postsData)
    })
  }

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
        <button
          className='create-btn'
          // onClick={() => setIsModelOpen(true)}
        >
          <PlusCircleIcon className='plus-icon' /> Create Post
        </button>
      </div>
      {/* BODY OF LIST of POSTS */}
      <div className='grid-layout'>
        {posts.map((post) => (
          <div className='grid-item ' key={post._id}>
            <div className='item-header'>
              <h1 className='item-title'>{post.title}</h1>
              <div className='btns-wrapper'>
                <button className='edit-btn'>
                  <Edit />
                </button>
                <button className='delete-btn'>
                  <DeleteIcon />
                </button>
              </div>
            </div>
            <Link href={`/admin/${post.slug}`} className='item-desc'>
              <p className='item-date'>{post.slug}</p>
              <br />
              {post.content.length > 100
                ? post.content.substring(0, 100) + '...'
                : post.content}
              <br />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
export default PostList
