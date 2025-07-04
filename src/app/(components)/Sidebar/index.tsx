'use client'
import React, { useState } from 'react'
import {
  Archive,
  CircleDollarSign,
  ClipboardList,
  Icon,
  LayoutDashboard,
  LayoutIcon,
  LucideIcon,
  Menu,
  SlidersHorizontal,
  SlidersIcon,
  User,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import '@/styles/components/sidebar.css'

interface SidebarLinkProps {
  href: string
  icon: LucideIcon // Use LucideIcon for icons
  label: string
  isCollapsed: boolean
}

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
}: SidebarLinkProps) => {
  const pathname = usePathname()
  const isActive =
    pathname === href || (pathname === '/' && href === '/create-post')

  return (
    <Link href={href} className='sidebar-link'>
      <div
        className={`sidebar-item ${isCollapsed ? 'collapsed' : 'expanded'} ${
          isActive ? 'active' : ''
        }`}
      >
        <Icon className='sidebar-icon' />
        <span className={`sidebar-label ${isCollapsed ? 'hide' : ''}`}>
          {label}
        </span>
      </div>
    </Link>
  )
}

const Sidebar = ({
  isCollapsed,
  setIsCollapsed,
}: {
  isCollapsed: boolean
  setIsCollapsed: (collapsed: boolean) => void
}) => {
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : 'expanded'}`}>
      <div className='sidebar-header'>
        <h1 className={`sidebar-title ${isCollapsed ? 'hide' : ''}`}>BLOG</h1>
        <button className='sidebar-toggle' onClick={toggleSidebar}>
          <Menu className='sidebar-icon' />
        </button>
      </div>

      <div className='sidebar-links'>
        <SidebarLink
          href={`/admin/list`}
          icon={ClipboardList}
          label='Posts'
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          href={`/admin/create-post`}
          icon={SlidersHorizontal}
          label='Create Post'
          isCollapsed={isCollapsed}
        />
      </div>

      <div className={`sidebar-footer ${isCollapsed ? 'hide' : ''}`}>
        <p>©2025 BLOG</p>
      </div>
    </div>
  )
}
export default Sidebar
