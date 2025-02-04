'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { ThumbsUp, Heart, Laugh, MessageCircle, Share2, Edit, Trash } from 'lucide-react'

interface Reaction {
  like: number;
  love: number;
  laugh: number;
}

interface Post {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  reactions: Reaction;
  comments: { id: number; author: string; content: string; date: string; }[];
}

export default function MyPosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      setIsLoading(true)
      fetch(`/api/posts?author=${encodeURIComponent(user.name)}`)
        .then(res => res.json())
        .then(data => {
          setPosts(data.sort((a: Post, b: Post) => new Date(b.date).getTime() - new Date(a.date).getTime())) // Sort posts by date, newest first
          setIsLoading(false)
        })
        .catch(err => {
          console.error('Failed to fetch posts:', err)
          toast.error('Failed to load posts')
          setIsLoading(false)
        })
    }
  }, [user])

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        const res = await fetch(`/api/posts?id=${id}`, { method: 'DELETE' })
        if (res.ok) {
          setPosts(posts.filter(post => post.id !== id))
          toast.success('Post deleted successfully')
        } else {
          throw new Error('Failed to delete post')
        }
      } catch (error) {
        console.error('Error deleting post:', error)
        toast.error('Failed to delete post')
      }
    }
  }

  const handleShare = async (post: Post) => {
    const shareData = {
      title: post.title,
      text: post.excerpt,
      url: `${window.location.origin}/post/${post.id}`,
    };

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        toast.success('Post shared successfully');
      } else {
        await navigator.clipboard.writeText(shareData.url);
        toast.success('Link copied to clipboard');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast.error('Failed to share post');
    }
  };

  if (!user) {
    return (
      <div className="text-center mt-8 p-4 bg-yellow-100 rounded-lg">
        <p className="text-yellow-800">Please log in to view your posts.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 font-serif text-center">My Posts</h1>
      {isLoading ? (
        <div className="text-center">
          <p className="text-xl">Loading your posts...</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center bg-white p-8 rounded-lg shadow-md">
          <p className="mb-4 text-xl">You haven't created any posts yet.</p>
          <Link 
            href="/create-post" 
            className="bg-primary text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors inline-block text-lg font-semibold"
          >
            Create Your First Post
          </Link>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/post/${post.id}`}>
                <div className="relative h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-opacity duration-300 hover:opacity-75"
                  />
                </div>
              </Link>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2 font-serif">
                  <Link href={`/post/${post.id}`} className="hover:text-primary transition-colors">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <span className="font-medium">{post.author}</span>
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex space-x-4">
                    <span className="flex items-center space-x-1 text-blue-500">
                      <ThumbsUp size={16} />
                      <span>{post.reactions.like}</span>
                    </span>
                    <span className="flex items-center space-x-1 text-red-500">
                      <Heart size={16} />
                      <span>{post.reactions.love}</span>
                    </span>
                    <span className="flex items-center space-x-1 text-yellow-500">
                      <Laugh size={16} />
                      <span>{post.reactions.laugh}</span>
                    </span>
                    <span className="flex items-center space-x-1 text-gray-500">
                      <MessageCircle size={16} />
                      <span>{post.comments.length}</span>
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <Link
                    href={`/edit-post/${post.id}`}
                    className="bg-primary text-white p-2 rounded hover:bg-blue-600 transition-colors"
                  >
                    <Edit size={20} />
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors"
                  >
                    <Trash size={20} />
                  </button>
                  <button
                    onClick={() => handleShare(post)}
                    className="bg-gray-200 text-gray-800 p-2 rounded hover:bg-gray-300 transition-colors flex items-center justify-center"
                    aria-label="Share post"
                  >
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      )}
    </div>
  )
}

