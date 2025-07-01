'use client'

import React from 'react'
import { Bell, Menu, Moon, Settings, Sun, User } from 'lucide-react'
import Link from 'next/link'
import '@/styles/components/navbar.css'

const Navbar = () => {
  const toggleSidebar = () => {}

  return (
    <div className='topbar'>
      {/* LEFT SIDE */}
      <div className='topbar-left'>
        <button className='menu-button' onClick={toggleSidebar}>
          <Menu className='icon-style' size={24} />
        </button>
      </div>
      {/* RIGHT SIDE */}
      <div className='topbar-right'>
        <div className='admin-info'>
          <User className='icon-style admin-avatar' size={24} />
          <span className='admin-name'>Admin</span>
        </div>
      </div>
    </div>
  )
}
export default Navbar
