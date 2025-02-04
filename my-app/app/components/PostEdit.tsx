'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

interface Post {
  id: number
  title: string
  content: string
  excerpt: string
  image: string
  author: string
  date: string
}

export default function PostEdit({ id }: { id: number }) {
  const [post, setPost] = useState<Post | null>(null)
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    fetch(`/api/posts?id=${id}`)
      .then(res => res.json())
      .then(data => setPost(data))
      .catch(err => console.error('Failed to fetch post:', err))
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      toast.error('You must be logged in to edit a post')
      return
    }
    try {
      const res = await fetch('/api/posts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      })
      if (res.ok) {
        toast.success('Post updated successfully')
        router.push(`/post/${id}`)
      } else {
        throw new Error('Failed to update post')
      }
    } catch (error) {
      console.error('Error updating post:', error)
      toast.error('Failed to update post')
    }
  }

  if (!post) return <div>Loading...</div>

  return (
    <motion.div
      className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-6 font-serif">Edit Post</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            id="title"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label htmlFor="excerpt" className="block mb-1 font-medium">Excerpt</label>
          <input
            type="text"
            id="excerpt"
            value={post.excerpt}
            onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label htmlFor="content" className="block mb-1 font-medium">Content</label>
          <textarea
            id="content"
            value={post.content}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            rows={10}
          ></textarea>
        </div>
        <div>
          <label htmlFor="image" className="block mb-1 font-medium">Image URL</label>
          <input
            type="url"
            id="image"
            value={post.image}
            onChange={(e) => setPost({ ...post, image: e.target.value })}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <button type="submit" className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition-colors">
          Update Post
        </button>
      </form>
    </motion.div>
  )
}

