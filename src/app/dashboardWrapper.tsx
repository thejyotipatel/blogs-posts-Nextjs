// Error: The default export is not a React Component in "/admin/[slug]/page"

// Call Stack
// 25

// Show 25 ignore-listed frame(s)
// 1
// 2
// This error happened while generating the page. Any console logs will be displayed in the terminal window

'use client'
import { isAdmin } from '@/lib/isAdmin'

import { useRouter } from 'next/navigation'

import React, { useState, useEffect } from 'react'
import Navbar from '@/app/(components)/Navbar'

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  const admin = isAdmin()
  const router = useRouter()

  const [posts, setPosts] = useState<any[]>([])

  const getData = async () => {
    fetch('/api/posts').then(async (res) => {
      if (!res.ok) throw new Error('Failed to fetch posts')
      const data = await res.json()
      setPosts(data)
    })
  }
  useEffect(() => {
    getData()
    if (admin) {
      return router.push('/admin')
    } else {
      return router.push('/post')
    }
  }, [admin])
  return (
    <div className={'main-wrapper'}>
      <main className={'main-content'}>
        <Navbar />
        {children}
      </main>
    </div>
  )
}
export default DashboardWrapper
