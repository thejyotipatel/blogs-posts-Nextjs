'use client'
import React, { useEffect, useState } from 'react'
import QuillEditor from '@/app/(components)/QuillEditer'
import '@/styles/components/CreatePostPage.css'
import { useAppContext } from '@/app/context'
import { useParams } from 'next/navigation'

// type Props = {
//   params: { slug: string }
//   post: {
//     _id: string
//     title: string
//     slug: string
//     content: string
//   }
// }

// type PostProps = {
//   _id: string
//   title: string
//   slug: string
//   content: string
// }
// type paramsType = { params: { slug: string } }

export default function EditPage() {
  const { editPost, getOnePost, isLoading, post } = useAppContext()
  const { slug } = useParams()

  // const [post, setPost] = useState<any[] | null>(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    console.log(slug)

    getOnePost(slug)
    setTitle(post?.title)
    setContent(post?.content)
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
          onClick={() => editPost(slug, title, content)}
          className='save-button'
        >
          Update Blog Post
        </button>
      </div>
    </div>
  )
}
