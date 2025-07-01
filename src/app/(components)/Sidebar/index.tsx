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
    pathname === href || (pathname === '/' && href === '/dashboard')

  return (
    <Link href={href}>
      <div
        className={`cursor-pointer flex items-center ${
          isCollapsed ? 'justify-center py-4' : 'justify-start px-4 py-4'
        } hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${
          isActive ? 'bg-blue-200 text-white' : ''
        }`}
      >
        <Icon className='w-6 h-6 !text-gray-700' />

        <span
          className={`${
            isCollapsed ? 'hidden' : 'block'
          } font-medium text-gray-700`}
        >
          {label}
        </span>
      </div>
    </Link>
  )
}

const Sidebar = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  const sidebarClassNames = `fixed flex flex-col ${
    isSidebarCollapsed ? 'w-0 md:w-16' : 'w-72 md:w-64'
  }
      bg-white transition-all duration-300 overflow-hidden h-full shadow-md
      z-40`

  return (
    <div className={sidebarClassNames}>
      {/* TOP LOGO */}
      <div
        className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${
          isSidebarCollapsed ? 'px-5' : 'px-8'
        }`}
      >
        <h1
          className={` ${
            isSidebarCollapsed ? 'hidden' : 'block'
          } font-extrabold text-2xl`}
        >
          BLOGs
        </h1>

        <button
          className='md:hidden py-2 px-3 rounded-full bg-gray-100 hover:bg-blue-100 transition-colors duration-200'
          onClick={toggleSidebar}
        >
          <Menu className='w-4 h-4' />
        </button>
      </div>

      {/* LINKS */}
      <div className='flex-grow mt-8'>
        <SidebarLink
          href='/list'
          icon={LayoutIcon}
          label='list'
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href='/create-post'
          icon={Archive}
          label='Create Post'
          isCollapsed={isSidebarCollapsed}
        />
      </div>

      {/* FOOTER */}
      <div
        className={`${isSidebarCollapsed ? 'hidden' : 'block'}
       mb-10`}
      >
        <p className='text-center text-xs  text-gray-500 '>©2025 BLOGs.</p>
      </div>
    </div>
  )
}
export default Sidebar
