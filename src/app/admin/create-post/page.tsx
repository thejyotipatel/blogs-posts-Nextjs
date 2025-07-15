'use client'

import { useState } from 'react'
import QuillEditor from '@/app/(components)/QuillEditer'
import '@/styles/components/CreatePostPage.css'
import { useAppContext } from '@/app/context'

export default function CreatePostPage() {
  const { addPost } = useAppContext()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

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

        <button onClick={() => addPost(title, content)} className='save-button'>
          Save Blog Post
        </button>
      </div>
    </div>
  )
}
