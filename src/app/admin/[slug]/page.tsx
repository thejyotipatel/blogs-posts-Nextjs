'use client'
import { notFound } from 'next/navigation'
import { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const PostDetail = async ({ params }: { params: { slug: string } }) => {
  const [value, setValue] = useState<string>('')

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${params.slug}`
  )

  if (!res.ok) return notFound()

  const post = await res.json()
  setValue(post.content)

  return (
    <div className='post-detail'>
      <h1 className='post-title'>{post.title}</h1>
      <ReactQuill theme='snow' value={value} onChange={setValue} />
    </div>
  )
}
export default PostDetail
