'use client'

import React from 'react'
import { PlusCircleIcon, User } from 'lucide-react'
import '@/styles/components/navbar.css'
import Link from 'next/link'
import { isAdmin } from '@/lib/isAdmin'
import { useRouter } from 'next/navigation'

const Navbar = () => {
  const admin = isAdmin()
  const router = useRouter()

  const handleAdminClick = () => {
    if (!admin) {
      router.push('/admin')
      localStorage.setItem('isAdmin', 'true')
    } else {
      router.push('/post')
      localStorage.removeItem('isAdmin')
    }
  }

  return (
    <div className={'topbar'}>
      {/* LEFT SIDE */}

      <h2 className='logo'>MBlog</h2>

      {/* RIGHT SIDE */}
      <div className='topbar-right'>
        {admin && (
          <>
            <Link href='/admin' className='post-btn'>
              Posts List
            </Link>
            <Link href='/admin/create-post' className='create-btn'>
              <PlusCircleIcon className='plus-icon' /> Create Post
            </Link>
          </>
        )}
        <button className='admin-info' onClick={handleAdminClick}>
          <User className='icon-style admin-avatar' size={24} />
          <span className='admin-name'>
            {admin ? 'Logout as admin' : 'Login as admin'}
          </span>
        </button>
      </div>
    </div>
  )
}
export default Navbar
