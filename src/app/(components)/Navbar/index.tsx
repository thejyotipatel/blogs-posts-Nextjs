'use client'

import { PlusCircleIcon, User } from 'lucide-react'
import '@/styles/components/navbar.css'
import Link from 'next/link'
import { useAppContext } from '@/app/context'

const Navbar = () => {
  const { isAdmin, handleAdmin } = useAppContext()

  return (
    <div className={'topbar'}>
      {/* LEFT SIDE */}

      <h2 className='logo'>MBlog</h2>

      {/* RIGHT SIDE */}
      <div className='topbar-right'>
        <Link href='/' className='post-btn'>
          Posts List
        </Link>
        {isAdmin && (
          <Link href='admin/create-post' className='create-btn'>
            <PlusCircleIcon className='plus-icon' /> Create Post
          </Link>
        )}
        <button className='admin-info' onClick={() => handleAdmin()}>
          <User className='icon-style admin-avatar' size={24} />
          <span className='admin-name'>
            {isAdmin ? 'Logout as admin' : 'Login as admin'}
          </span>
        </button>
      </div>
    </div>
  )
}
export default Navbar
