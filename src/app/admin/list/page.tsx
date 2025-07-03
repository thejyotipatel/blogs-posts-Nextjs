'use client'
import React from 'react'
import Header from '@/app/(components)/Header'
import '@/styles/components/list.css'
import { PlusCircleIcon, SearchIcon } from 'lucide-react'

const PostList = () => {
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
        <Header name='List of Posts' />
        <button
          className='create-btn'
          // onClick={() => setIsModelOpen(true)}
        >
          <PlusCircleIcon className='plus-icon' /> Create Post
        </button>
      </div>
      {/* BODY OF LIST of POSTS */}
      {/* <div className='grid-layout'></div> */}
    </div>
  )
}
export default PostList
