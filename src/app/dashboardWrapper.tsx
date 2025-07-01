'use client'

import React, { useState } from 'react'
import Navbar from '@/app/(components)/Navbar'
// import Sidebar from '@/app/(components)/Sidebar'

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  const isSidebarCollapsed = false
  return (
    <div className={` flex bg-gray-50 text-gray-900  w-full min-h-screen`}>
      {/* <Sidebar /> */}
      <main
        className={`flex flex-col w-full h-full py-7 px-9 bg-gray-50 ${
          isSidebarCollapsed ? 'md:pl-24' : 'md:pl-72'
        }`}
      >
        <Navbar />
        {children}
      </main>
    </div>
  )
}
export default DashboardWrapper
