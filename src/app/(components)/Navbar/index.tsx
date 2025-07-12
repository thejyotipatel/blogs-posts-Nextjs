'use client'

import React, { useState } from 'react'
import { Menu, User } from 'lucide-react'
import '@/styles/components/navbar.css'
import Link from 'next/link'

const Navbar = ({
  isAdmin,
  setIsAdmin,
  isCollapsed,
  setIsCollapsed,
}: {
  isAdmin: boolean
  setIsAdmin: (isAdmin: boolean) => void
  isCollapsed: boolean
  setIsCollapsed: (collapsed: boolean) => void
}) => {
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
    console.log(`Sidebar is now ${isCollapsed ? 'expanded' : 'collapsed'}`)
  }
  const handleAdminClick = () => {
    setIsAdmin(!isAdmin)
  }

  return (
    <div className={'topbar'}>
      {/* LEFT SIDE */}

      <h2 className='logo'>My Blog</h2>

      {/* RIGHT SIDE */}
      <div className='topbar-right'>
        <Link
          href={`${isAdmin ? '/admin' : '/post'}`}
          className='admin-info'
          onClick={handleAdminClick}
        >
          <User className='icon-style admin-avatar' size={24} />
          <span className='admin-name'>
            {isAdmin ? 'Logout as admin' : 'Login as admin'}
          </span>
        </Link>
      </div>
    </div>
  )
}
export default Navbar
