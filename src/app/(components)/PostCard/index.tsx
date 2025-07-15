'use client'

import { DeleteIcon, Edit } from 'lucide-react'
import Link from 'next/link'
import { useAppContext } from '@/app/context'

type Post = {
  _id: string
  title: string
  slug: string
  content: string
}
const PostCard = ({ post }: { post: Post }) => {
  const { isAdmin, deletePost, stripHtmlTags } = useAppContext()

  return (
    <div className='grid-item ' key={post._id}>
      <div className='item-header'>
        <h1 className='item-title'>{post.title}</h1>

        {isAdmin && (
          <div className='btns-wrapper'>
            <Link href={`/admin/${post.slug}`} className='edit-btn'>
              <Edit />
            </Link>
            <button
              onClick={() => deletePost(post.slug)}
              className='delete-btn'
            >
              <DeleteIcon />
            </button>
          </div>
        )}
      </div>
      <div className='post-link'>
        <Link
          href={`/${isAdmin ? 'admin' : 'post'}/${post.slug}`}
          className='item-desc'
        >
          <p className='item-slug'>
            <span className='slug'>Slug: </span>
            {post.slug}
          </p>
          <br />
          {post.content.length > 100
            ? stripHtmlTags(post.content.substring(0, 100)) + '...'
            : stripHtmlTags(post.content)}
          <br />
        </Link>
      </div>
    </div>
  )
}
export default PostCard
