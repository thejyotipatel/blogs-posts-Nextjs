'use client'

import React, { useState } from 'react'
import { Menu, User } from 'lucide-react'
import '@/styles/components/navbar.css'
import Link from 'next/link'

const Navbar = ({
  admin,
  isCollapsed,
  setIsCollapsed,
}: {
  admin: boolean
  isCollapsed: boolean
  setIsCollapsed: (collapsed: boolean) => void
}) => {
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
    console.log(`Sidebar is now ${isCollapsed ? 'expanded' : 'collapsed'}`)
  }
  return (
    <div className={' topbar'}>
      {/* LEFT SIDE */}
      <button className='menu-button' onClick={toggleSidebar}>
        <Menu className='icon-style' size={24} />
      </button>
      {/* RIGHT SIDE */}
      <div className='topbar-right'>
        <Link href='./create-post' className='admin-info'>
          <User className='icon-style admin-avatar' size={24} />
          <span className='admin-name'>
            Login as {admin ? 'admin' : 'user'}
          </span>
        </Link>
      </div>
    </div>
  )
}
export default Navbar
