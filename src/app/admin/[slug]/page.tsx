'use client'
import React, { useEffect, useState } from 'react'
import QuillEditor from '@/app/(components)/QuillEditer'
import '@/styles/components/CreatePostPage.css'
import { useAppContext } from '@/app/context'
import { useParams } from 'next/navigation'

export default function EditPage() {
  const { editPost, getOnePost, post } = useAppContext()
  const { slug } = useParams()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  useEffect(() => {
    if (typeof slug === 'string') {
      getOnePost(slug)
    }
  }, [])

  useEffect(() => {
    if (post) {
      setTitle(post.title)
      setContent(post.content)
    }
  }, [])
  return (
    <div className='create-post-container'>
      <div className='create-post-wrapper'>
        <div className='create-post-bar'>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='create-post-input'
            placeholder='Post Title'
          />
        </div>
      </div>

      <div className='editor-wrapper'>
        <QuillEditor content={content} setContent={setContent} />

        <button
          onClick={() => {
            if (typeof slug === 'string') {
              editPost(slug, title, content)
            }
          }}
          className='save-button'
          disabled={typeof slug !== 'string'}
        >
          Update Blog Post
        </button>
      </div>
    </div>
  )
}
