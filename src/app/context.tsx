'use client'

import { useRouter } from 'next/navigation'
import React, { createContext, useContext, useEffect, useState } from 'react'

type Post = {
  _id: string
  title: string
  content: string
  slug: string
}

type ContextType = {
  isAdmin: boolean
  isLoading: boolean
  posts: Post[] | null
  post: Post | null

  handleAdmin: () => void
  stripHtmlTags: (html: string) => string

  getPosts: (query: string | '') => Promise<void>
  getOnePost: (slug: string) => Promise<void>
  deletePost: (slug: string) => Promise<void>
  editPost: (slug: string, title: string, content: string) => Promise<void>
  addPost: (title: string, content: string) => Promise<void>
}

const AppContext = createContext<ContextType | null>(null)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [posts, setPosts] = useState<Post[]>([])
  const [post, setPost] = useState<Post | null>(null)

  const handleStorage = () => {
    const admin = localStorage.getItem('isAdmin') === 'true'
    setIsAdmin(admin)
  }

  const router = useRouter()
  const handleAdmin = () => {
    const admin = localStorage.getItem('isAdmin') === 'true'
    if (admin) {
      localStorage.removeItem('isAdmin')
      setIsAdmin(false)
    } else {
      localStorage.setItem('isAdmin', 'true')
      setIsAdmin(true)
    }
    router.push('/')
  }

  const stripHtmlTags = (html: string) => {
    return html.replace(/<[^>]+>/g, '')
  }

  const getPosts = async (query: string | '') => {
    setIsLoading(true)
    try {
      const url =
        query.trim().length >= 2 ? `/api/posts?q=${query}` : '/api/posts'

      const res = await fetch(url)
      const data = await res.json()
      setPosts(data)

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      alert(error)
    }
  }

  const getOnePost = async (slug: string) => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/posts/${slug}`)
      const data = await res.json()
      setPost(data)

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      alert(error)
    }
  }

  const addPost = async (title: string, content: string) => {
    if (!confirm('Are you sure you want to save this post?')) return

    setIsLoading(true)
    try {
      const res = await fetch('/api/posts/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      })

      if (!res.ok) {
        const errMes = await res.json()
        return alert(errMes.error)
      }

      if (res.ok) getPosts('')

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      alert(error)
    }
  }

  const deletePost = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return

    setIsLoading(true)
    try {
      const res = await fetch(`/api/posts/${slug}`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        const errMes = await res.json()
        alert(errMes.error)
      }

      if (res.ok) getPosts('')

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      alert(error)
    }
  }

  const editPost = async (slug: string, title: string, content: string) => {
    if (!confirm('Are you sure you want to UPDATE this post?')) return

    setIsLoading(true)
    try {
      const res = await fetch(`/api/posts/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      })

      if (!res.ok) {
        const errMes = await res.json()
        return alert(errMes.error)
      }

      if (res.ok) getPosts('')

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      alert(error)
    }
  }

  useEffect(() => {
    const admin = localStorage.getItem('isAdmin') === 'true'
    setIsAdmin(admin)

    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  useEffect(() => {
    getPosts('')
  }, [])
  return (
    <AppContext.Provider
      value={{
        isAdmin,
        isLoading,
        posts,
        post,
        handleAdmin,
        getPosts,
        getOnePost,
        addPost,
        editPost,
        deletePost,
        stripHtmlTags,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)

  if (!context) throw new Error('useAppContext must be used within AppProvider')

  return context
}
