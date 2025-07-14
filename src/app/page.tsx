import { isAdmin } from '@/lib/isAdmin'
import PostList from './admin/page'
import Post from '@/app/post/page'

export default function Home() {
  const admin = isAdmin()
  return admin ? <PostList /> : <Post />
}
