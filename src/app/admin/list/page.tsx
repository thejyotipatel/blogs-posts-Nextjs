'use client'
import React from 'react'
import Header from '@/app/(components)/Header'
import '@/styles/components/list.css'
import {
  Delete,
  DeleteIcon,
  Edit,
  PlusCircleIcon,
  SearchIcon,
} from 'lucide-react'

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
        <div className='grid-item '>
          <div className='item-header'>
            <h1 className='item-title'>Post Title</h1>
            <div className='btns-wrapper'>
              <button className='edit-btn'>
                <Edit />
              </button>
              <button className='delete-btn'>
                <DeleteIcon />
              </button>
            </div>
          </div>
          <p className='item-desc'>
            Post Excerpt Lorem ipsum, dolor sit amet consectetur adipisicing
            elit. Voluptate reiciendis rem aspernatur, repellendus ratione id.
            <br />
            <span className='item-date'>March 10, 2023</span>
          </p>
        </div>
      </div>
    </div>
  )
}
export default PostList
