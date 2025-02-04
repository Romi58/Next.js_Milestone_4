'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export default function CreatePost() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [customImage, setCustomImage] = useState('')
  const [customName, setCustomName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { user } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      toast.error('You must be logged in to create a post')
      return
    }
    
    setIsLoading(true)

    const newPost = {
      title,
      content,
      excerpt: content.slice(0, 150) + '...', // Create a short excerpt
      image: customImage || 'https://picsum.photos/seed/' + Math.random() + '/800/600', // Use custom image or random image
      author: user.name, // Always use the logged-in user's name
      date: new Date().toISOString(),
      reactions: { like: 0, love: 0, laugh: 0 },
      comments: []
    }

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      })

      if (!res.ok) {
        throw new Error('Failed to create post')
      }

      toast.success('Post created successfully!')
      router.push('/my-posts') // Redirect to My Posts page after creation
    } catch (error) {
      console.error('Error creating post:', error)
      toast.error('Failed to create post')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-6 font-serif text-center">Create New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block mb-1 font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
            placeholder="Enter your post title"
          />
        </div>
        <div>
          <label htmlFor="content" className="block mb-1 font-medium text-gray-700">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
            rows={10}
            placeholder="Write your post content here"
          ></textarea>
        </div>
        <div>
          <label htmlFor="customImage" className="block mb-1 font-medium text-gray-700">Custom Image URL (optional)</label>
          <input
            type="url"
            id="customImage"
            value={customImage}
            onChange={(e) => setCustomImage(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
            placeholder="https://example.com/your-image.jpg"
          />
        </div>
        <div>
          <label htmlFor="customName" className="block mb-1 font-medium text-gray-700">Custom Author Name (optional)</label>
          <input
            type="text"
            id="customName"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
            placeholder="Your preferred author name"
          />
        </div>
        <button 
          type="submit" 
          className={`w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Creating Post...' : 'Create Post'}
        </button>
      </form>
    </motion.div>
  )
}

