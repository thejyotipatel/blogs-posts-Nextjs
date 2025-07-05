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
  const handleAdminClick = () => {
    if (!admin) {
      return (admin = true)
    }
    return (admin = false)
  }

  return (
    <div className={'topbar'}>
      {/* LEFT SIDE */}
      {/* {admin ? (
        <button className='menu-button' onClick={toggleSidebar}>
          <Menu className='icon-style' size={24} />
        </button>
      ) : ( */}
      <h2 className='logo'>My Blog</h2>
      {/* )} */}
      {/* RIGHT SIDE */}
      <div className='topbar-right'>
        {!admin ? (
          <Link
            href='./admin/list'
            className='admin-info'
            onClick={handleAdminClick}
          >
            <User className='icon-style admin-avatar' size={24} />
            <span className='admin-name'>Login as admin</span>
          </Link>
        ) : (
          <Link href='./post' className='admin-info' onClick={handleAdminClick}>
            <User className='icon-style admin-avatar' size={24} />
            <span className='admin-name'>Login as user</span>
          </Link>
        )}
      </div>
    </div>
  )
}
export default Navbar
