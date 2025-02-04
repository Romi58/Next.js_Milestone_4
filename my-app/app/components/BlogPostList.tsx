"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  image: string
  author: string
  date: string
}

export default function BlogPostList() {
  const [posts, setPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
  }, [])

  return (
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
            <div className="relative h-48 md:h-64">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                layout="fill"
                objectFit="cover"
                className="transition-opacity duration-300 hover:opacity-75"
              />
            </div>
          </Link>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2 font-serif text-gray-800 hover:text-primary transition-colors">
              <Link href={`/post/${post.id}`}>{post.title}</Link>
            </h2>
            <p className="text-gray-600 mb-2">By {post.author}</p>
            <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>{new Date(post.date).toLocaleDateString()}</span>
            </div>
            <Link
              href={`/post/${post.id}`}
              className="mt-4 inline-block bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Read more
            </Link>
          </div>
        </motion.article>
      ))}
    </motion.div>
  )
}

