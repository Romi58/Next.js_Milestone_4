"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { useAuth } from "../context/AuthContext"
import toast from "react-hot-toast"
import { ThumbsUp, Heart, Laugh, Share2, Edit, Trash } from "lucide-react"

interface Reaction {
  like: number
  love: number
  laugh: number
}

interface Comment {
  id: number
  author: string
  content: string
  date: string
}

interface Post {
  id: number
  title: string
  content: string
  image: string
  author: string
  date: string
  reactions: Reaction
  comments: Comment[]
  excerpt: string
}

export default function PostView({ id }: { id: number }) {
  const [post, setPost] = useState<Post | null>(null)
  const [newComment, setNewComment] = useState("")
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    fetch(`/api/posts?id=${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data))
      .catch((err) => console.error("Failed to fetch post:", err))
  }, [id])

  const handleReaction = async (type: keyof Reaction) => {
    if (!post) return
    const updatedReactions = { ...post.reactions, [type]: post.reactions[type] + 1 }
    const updatedPost = { ...post, reactions: updatedReactions }
    setPost(updatedPost)
    try {
      await fetch("/api/posts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPost),
      })
    } catch (error) {
      console.error("Error updating reactions:", error)
      toast.error("Failed to update reaction")
    }
  }

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!post || !user) return
    const newCommentObj: Comment = {
      id: post.comments.length + 1,
      author: user.name,
      content: newComment,
      date: new Date().toISOString(),
    }
    const updatedComments = [...post.comments, newCommentObj]
    const updatedPost = { ...post, comments: updatedComments }
    setPost(updatedPost)
    setNewComment("")
    try {
      await fetch("/api/posts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPost),
      })
    } catch (error) {
      console.error("Error adding comment:", error)
      toast.error("Failed to add comment")
    }
  }

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        const res = await fetch(`/api/posts?id=${id}`, { method: "DELETE" })
        if (res.ok) {
          toast.success("Post deleted successfully")
          router.push("/my-posts")
        } else {
          throw new Error("Failed to delete post")
        }
      } catch (error) {
        console.error("Error deleting post:", error)
        toast.error("Failed to delete post")
      }
    }
  }

  const handleShare = async () => {
    const shareData = {
      title: post.title,
      text: post.excerpt,
      url: window.location.href,
    }

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData)
        toast.success("Post shared successfully")
      } else {
        await navigator.clipboard.writeText(window.location.href)
        toast.success("Link copied to clipboard")
      }
    } catch (error) {
      console.error("Error sharing:", error)
      toast.error("Failed to share post")
    }
  }

  if (!post) return <div>Loading...</div>

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <Image
        src={post.image || "/placeholder.svg"}
        alt={post.title}
        width={1200}
        height={600}
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4 font-serif">{post.title}</h1>
        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
          <span>{post.author}</span>
          <span>{new Date(post.date).toLocaleDateString()}</span>
        </div>
        <div className="prose max-w-none mb-6" dangerouslySetInnerHTML={{ __html: post.content }} />

        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            <button onClick={() => handleReaction("like")} className="flex items-center space-x-1 text-blue-500">
              <ThumbsUp size={20} />
              <span>{post.reactions.like}</span>
            </button>
            <button onClick={() => handleReaction("love")} className="flex items-center space-x-1 text-red-500">
              <Heart size={20} />
              <span>{post.reactions.love}</span>
            </button>
            <button onClick={() => handleReaction("laugh")} className="flex items-center space-x-1 text-yellow-500">
              <Laugh size={20} />
              <span>{post.reactions.laugh}</span>
            </button>
          </div>
          <div className="flex space-x-2">
            {user && (
              <>
                <button
                  onClick={() => router.push(`/edit-post/${id}`)}
                  className="bg-primary text-white p-2 rounded hover:bg-primary-dark transition-colors"
                >
                  <Edit size={20} />
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors"
                >
                  <Trash size={20} />
                </button>
              </>
            )}
            <button
              onClick={handleShare}
              className="bg-gray-200 text-gray-800 p-2 rounded hover:bg-gray-300 transition-colors flex items-center"
            >
              <Share2 size={20} className="mr-2" />
              Share
            </button>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Comments</h2>
          {post.comments.map((comment) => (
            <div key={comment.id} className="bg-gray-50 p-4 rounded-lg mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">{comment.author}</span>
                <span className="text-sm text-gray-500">{new Date(comment.date).toLocaleDateString()}</span>
              </div>
              <p>{comment.content}</p>
            </div>
          ))}
          {user && (
            <form onSubmit={handleCommentSubmit} className="mt-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full p-2 border rounded-lg resize-none"
                rows={3}
                placeholder="Add a comment..."
                required
              />
              <button
                type="submit"
                className="mt-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
              >
                Post Comment
              </button>
            </form>
          )}
        </div>
      </div>
    </motion.article>
  )
}

