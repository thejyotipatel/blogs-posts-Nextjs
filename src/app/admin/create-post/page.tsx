'use client'

import { useState } from 'react'
import QuillEditor from '@/app/(components)/QuillEditer'
import '@/styles/components/CreatePostPage.css'
export default function CreatePostPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = async () => {
    const res = await fetch('/api/posts/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    })
    const data = await res.json()
    console.log(data)
  }

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

        <button onClick={handleSubmit} className='save-button'>
          Save Blog Post
        </button>
      </div>
    </div>
  )
}
