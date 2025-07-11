'use client'

import { DeleteIcon, Edit } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

type PostCardProps = {
  post: {
    _id: string
    title: string
    slug: string
    content: string
  }
}
const PostCard = ({ post }: PostCardProps) => {
  return (
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
  )
}
export default PostCard
