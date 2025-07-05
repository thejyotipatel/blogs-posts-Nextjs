// Error: The default export is not a React Component in "/admin/[slug]/page"

// Call Stack
// 25

// Show 25 ignore-listed frame(s)
// 1
// 2
// This error happened while generating the page. Any console logs will be displayed in the terminal window

'use client'

import { useRouter } from 'next/navigation'

import React, { useState, useEffect } from 'react'
import Navbar from '@/app/(components)/Navbar'

export const admin = true
const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [posts, setPosts] = useState<any[]>([])
  const router = useRouter()

  const getData = async () => {
    fetch('/api/posts').then(async (res) => {
      if (!res.ok) throw new Error('Failed to fetch posts')
      const data = await res.json()
      setPosts(data)
    })
  }
  useEffect(() => {
    getData()
    if (!admin) {
      router.push('/posts')
    }
  }, [admin])
  return (
    <div className={'main-wrapper'}>
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
