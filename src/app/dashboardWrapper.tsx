'use client'

import React, { useState } from 'react'
import Navbar from '@/app/(components)/Navbar'
import Sidebar from '@/app/(components)/Sidebar'
import '@/styles/globals.css'

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const admin = true
  return (
    <div
      className={`main-wrapper ${
        isSidebarCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'
      }`}
    >
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />
      <main className={'main-content'}>
        <Navbar
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
          admin={admin}
        />
        {children}
      </main>
    </div>
  )
}
export default DashboardWrapper
