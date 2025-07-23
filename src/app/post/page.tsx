'use client'
import React, { useEffect, useState } from 'react'
import Header from '@/app/(components)/Header'
import '@/styles/components/list.css'
import { SearchIcon } from 'lucide-react'
import PostCard from '@/app/(components)/PostCard'
import { useAppContext } from '@/app/context'

const Post = () => {
  const { isLoading, posts, getPosts } = useAppContext()

  const [query, setQuery] = useState('')

  const handleSearch = (value: string) => {
    setQuery(value)
  }
  useEffect(() => {
    getPosts(query)
  }, [])

  return (
    <div className='products-container'>
      {/* SEARCH BAR */}
      <div className='search-wrapper'>
        <div className='search-bar'>
          <SearchIcon className='search-icon' />
          <input
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className='search-input'
            placeholder='Search products...'
          />
        </div>
      </div>
      {/* HEADER BAR   */}

      <div className='header-wrapper'>
        <Header name='Blog Posts' />
        <p className='blog-count'>{posts!.length} posts</p>
      </div>
      {/* BODY OF LIST of POSTS */}
      {isLoading && <p>Loading...</p>}
      <div className='grid-layout'>
        {posts!.length > 0
          ? posts!.map((post) => <PostCard key={post._id} post={post} />)
          : !isLoading && <p>No posts found.</p>}
      </div>
    </div>
  )
}
export default Post
